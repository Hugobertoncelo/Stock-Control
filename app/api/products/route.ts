import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logActivity } from "@/lib/activityLogger";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const warehouseId = searchParams.get("warehouseId");
    const supplierId = searchParams.get("supplierId");

    const where: any = {};

    if (search) {
      where.OR = [
        { productName: { contains: search, mode: "insensitive" } },
        { sku: { contains: search, mode: "insensitive" } },
      ];
    }

    if (category) {
      where.category = category;
    }

    if (warehouseId) {
      where.warehouseId = parseInt(warehouseId);
    }

    if (supplierId) {
      where.supplierId = parseInt(supplierId);
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        warehouse: true,
        supplier: true,
        creator: {
          select: {
            userId: true,
            fullName: true,
          },
        },
      },
      orderBy: {
        productId: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error: any) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Falha ao buscar produtos",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      productName,
      sku,
      category,
      unitPrice,
      quantity,
      minimumQuantity,
      maximumQuantity,
      warehouseId,
      supplierId,
      createdBy,
    } = body;

    if (!productName || !sku || !unitPrice) {
      return NextResponse.json(
        {
          success: false,
          error: "É necessário informar o nome do produto, o código e o preço.",
        },
        { status: 400 }
      );
    }

    const existingProduct = await prisma.product.findUnique({
      where: { sku },
    });

    if (existingProduct) {
      return NextResponse.json(
        { success: false, error: "Produto com este SKU já existe" },
        { status: 409 }
      );
    }

    const product = await prisma.product.create({
      data: {
        productName,
        sku,
        category: category || null,
        unitPrice: parseFloat(unitPrice),
        quantity: parseInt(quantity || 0),
        minimumQuantity: parseInt(minimumQuantity || 0),
        maximumQuantity: parseInt(maximumQuantity || 0),
        warehouseId: warehouseId ? parseInt(warehouseId) : null,
        supplierId: supplierId ? parseInt(supplierId) : null,
        createdBy: createdBy ? parseInt(createdBy) : null,
      },
      include: {
        warehouse: true,
        supplier: true,
        creator: {
          select: {
            userId: true,
            fullName: true,
          },
        },
      },
    });

    await logActivity({
      userId: createdBy ? parseInt(createdBy) : null,
      action: "CREATE",
      entityType: "PRODUCT",
      entityId: product.productId,
      entityName: product.productName,
      details: `Produto criado: ${product.productName} (Código: ${product.sku})`,
    });

    return NextResponse.json(
      { success: true, data: product, message: "Produto criado com sucesso" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erro ao criar o produto:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Falha ao criar o produto",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
