import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logActivity } from "@/lib/activityLogger";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("productId");

    const where = productId ? { productId: parseInt(productId) } : {};

    const purchases = await prisma.purchase.findMany({
      where,
      include: {
        product: true,
        supplier: true,
        user: {
          select: {
            userId: true,
            fullName: true,
          },
        },
      },
      orderBy: { purchaseDate: "desc" },
    });

    return NextResponse.json(purchases);
  } catch (error) {
    console.error("Erro ao buscar compras:", error);
    return NextResponse.json(
      { error: "Falha ao buscar compras" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      supplierId,
      productId,
      purchasedQuantity,
      purchasePrice,
      createdBy,
    } = body;

    if (!supplierId || !productId || !purchasedQuantity || !purchasePrice) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    if (purchasedQuantity <= 0) {
      return NextResponse.json(
        { error: "A quantidade deve ser maior que 0." },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const purchase = await tx.purchase.create({
        data: {
          supplierId: parseInt(supplierId),
          productId: parseInt(productId),
          purchasedQuantity: parseInt(purchasedQuantity),
          purchasePrice: parseFloat(purchasePrice),
          createdBy: createdBy ? parseInt(createdBy) : null,
        },
        include: {
          product: true,
          supplier: true,
        },
      });

      await tx.product.update({
        where: { productId: parseInt(productId) },
        data: {
          quantity: {
            increment: parseInt(purchasedQuantity),
          },
        },
      });

      await tx.stockMovement.create({
        data: {
          productId: parseInt(productId),
          quantity: parseInt(purchasedQuantity),
          type: "IN",
          reference: `Purchase #${purchase.purchaseId}`,
          userId: createdBy ? parseInt(createdBy) : null,
        },
      });

      await tx.stockBatch.create({
        data: {
          productId: parseInt(productId),
          purchaseId: purchase.purchaseId,
          quantityIn: parseInt(purchasedQuantity),
          quantityRemaining: parseInt(purchasedQuantity),
          purchasePrice: parseFloat(purchasePrice),
        },
      });

      return purchase;
    });

    await logActivity({
      userId: createdBy ? parseInt(createdBy) : null,
      action: "CREATE",
      entityType: "PURCHASE",
      entityId: result.purchaseId,
      entityName: `${result.product.productName} de ${result.supplier.supplierName}`,
      details: `Compra registrada: ${purchasedQuantity} unidades de ${result.product.productName} from ${result.supplier.supplierName} at $${purchasePrice}/unit`,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar a compra:", error);
    return NextResponse.json(
      { error: "Falha ao criar a compra" },
      { status: 500 }
    );
  }
}
