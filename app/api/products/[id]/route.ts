import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logActivity } from "@/lib/activityLogger";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    let product = null;
    const productId = parseInt(id);
    if (!isNaN(productId)) {
      product = await prisma.product.findUnique({
        where: { productId },
        include: { warehouse: true },
      });
    }
    if (!product) {
      product = await prisma.product.findUnique({
        where: { sku: id },
        include: { warehouse: true },
      });
    }
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch product",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const productId = parseInt(id);
    if (isNaN(productId)) {
      return NextResponse.json(
        { success: false, error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      productName,
      sku,
      unitPrice,
      quantity,
      minimumQuantity,
      maximumQuantity,
      warehouseId,
    } = body;

    const existingProduct = await prisma.product.findUnique({
      where: { productId },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    if (sku && sku !== existingProduct.sku) {
      const skuConflict = await prisma.product.findUnique({
        where: { sku },
      });

      if (skuConflict) {
        return NextResponse.json(
          { success: false, error: "Produto com este SKU já existe" },
          { status: 409 }
        );
      }
    }

    const product = await prisma.product.update({
      where: { productId },
      data: {
        ...(productName && { productName }),
        ...(sku && { sku }),
        ...(unitPrice && { unitPrice: parseFloat(unitPrice) }),
        ...(quantity !== undefined && { quantity: parseInt(quantity) }),
        ...(minimumQuantity !== undefined && {
          minimumQuantity: parseInt(minimumQuantity),
        }),
        ...(maximumQuantity !== undefined && {
          maximumQuantity: parseInt(maximumQuantity),
        }),
        ...(warehouseId !== undefined && {
          warehouseId: warehouseId ? parseInt(warehouseId) : null,
        }),
      },
      include: {
        warehouse: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: product,
      message: "Produto atualizado com sucesso",
    });
  } catch (error: any) {
    console.error("Erro ao atualizar produto:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Falha ao atualizar produto",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const productId = parseInt(id);
    if (isNaN(productId)) {
      return NextResponse.json(
        { success: false, error: "ID do produto inválido" },
        { status: 400 }
      );
    }

    const userId = request.headers.get("x-user-id");

    const existingProduct = await prisma.product.findUnique({
      where: { productId },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: { productId },
    });

    await logActivity({
      userId: userId ? parseInt(userId) : null,
      action: "DELETE",
      entityType: "PRODUCT",
      entityId: productId,
      entityName: existingProduct.productName,
      details: `Produto excluído: ${existingProduct.productName} (Código: ${existingProduct.sku})`,
    });

    return NextResponse.json({
      success: true,
      message: "Produto excluído com sucesso",
    });
  } catch (error: any) {
    console.error("Erro ao excluir produto:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Falha ao excluir produto",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
