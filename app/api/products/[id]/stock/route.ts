import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { quantity, type } = body;

    if (!quantity || !type) {
      return NextResponse.json(
        {
          success: false,
          error:
            "É necessário informar a quantidade e o tipo (adicionar/remover)",
        },
        { status: 400 }
      );
    }

    const quantityNum = parseInt(quantity);

    if (quantityNum <= 0) {
      return NextResponse.json(
        { success: false, error: "A quantidade deve ser maior que 0" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { productId: parseInt(id) },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    let newQuantity = product.quantity;

    if (type === "add") {
      newQuantity += quantityNum;
    } else if (type === "remove") {
      if (product.quantity < quantityNum) {
        return NextResponse.json(
          { success: false, error: "Quantidade de estoque insuficiente" },
          { status: 400 }
        );
      }
      newQuantity -= quantityNum;
    } else {
      return NextResponse.json(
        { success: false, error: 'Tipo inválido. Use "add" ou "remove"' },
        { status: 400 }
      );
    }

    const [updatedProduct] = await prisma.$transaction([
      prisma.product.update({
        where: { productId: parseInt(id) },
        data: { quantity: newQuantity },
        include: { warehouse: true },
      }),
      prisma.stockMovement.create({
        data: {
          productId: parseInt(id),
          quantity: quantityNum,
          type: type === "add" ? "IN" : "OUT",
          reference: `Manual ${type === "add" ? "adicionado" : "removido"}`,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: `Estoque ${
        type === "add" ? "adicionado" : "removido"
      } com sucesso`,
    });
  } catch (error: any) {
    console.error("Erro ao atualizar estoque:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Falha ao atualizar estoque",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
