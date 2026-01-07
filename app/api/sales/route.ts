import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logActivity } from "@/lib/activityLogger";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("productId");

    const where = productId ? { productId: parseInt(productId) } : {};

    const sales = await prisma.sale.findMany({
      where,
      include: {
        product: true,
        customer: true,
        user: {
          select: {
            userId: true,
            fullName: true,
          },
        },
      },
      orderBy: { saleDate: "desc" },
    });

    const salesWithProfit = sales.map((sale) => {
      const costOfGoodsSold = sale.costOfGoodsSold
        ? parseFloat(sale.costOfGoodsSold.toString())
        : 0;
      const revenue = sale.soldQuantity * parseFloat(sale.salePrice.toString());
      const profit = revenue - costOfGoodsSold;

      return {
        ...sale,
        profit,
        costOfGoodsSold,
      };
    });

    return NextResponse.json(salesWithProfit);
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
    return NextResponse.json(
      { error: "Falha ao buscar vendas" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerId, productId, soldQuantity, salePrice, createdBy } = body;

    if (!customerId || !productId || !soldQuantity || !salePrice) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    if (soldQuantity <= 0) {
      return NextResponse.json(
        { error: "A quantidade deve ser maior que 0" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { productId: parseInt(productId) },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    if (product.quantity < soldQuantity) {
      return NextResponse.json(
        { error: `Estoque insuficiente. Disponível: ${product.quantity}` },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const stockBatches = await tx.stockBatch.findMany({
        where: {
          productId: parseInt(productId),
          quantityRemaining: { gt: 0 },
        },
        orderBy: { batchDate: "asc" },
      });

      let remainingQty = parseInt(soldQuantity);
      let totalCost = 0;

      if (stockBatches.length > 0) {
        for (const batch of stockBatches) {
          if (remainingQty <= 0) break;
          const qtyToConsume = Math.min(remainingQty, batch.quantityRemaining);
          totalCost +=
            qtyToConsume * parseFloat(batch.purchasePrice.toString());
          remainingQty -= qtyToConsume;
          await tx.stockBatch.update({
            where: { batchId: batch.batchId },
            data: {
              quantityRemaining: batch.quantityRemaining - qtyToConsume,
            },
          });
        }
      } else {
      }

      const qtyToDecrement = Math.max(0, remainingQty);
      if (qtyToDecrement > 0) {
        if (product.quantity < qtyToDecrement) {
          throw new Error("Estoque insuficiente disponível");
        }
        await tx.product.update({
          where: { productId: parseInt(productId) },
          data: {
            quantity: {
              decrement: qtyToDecrement,
            },
          },
        });
      }

      const revenue = parseInt(soldQuantity) * parseFloat(salePrice);
      const profit = revenue - totalCost;

      const sale = await tx.sale.create({
        data: {
          customerId: parseInt(customerId),
          productId: parseInt(productId),
          soldQuantity: parseInt(soldQuantity),
          salePrice: parseFloat(salePrice),
          costOfGoodsSold: totalCost,
          createdBy: createdBy ? parseInt(createdBy) : null,
        },
        include: {
          product: true,
          customer: true,
        },
      });

      await tx.stockMovement.create({
        data: {
          productId: parseInt(productId),
          quantity: -parseInt(soldQuantity),
          type: "OUT",
          reference: `Sale #${sale.saleId}`,
          userId: createdBy ? parseInt(createdBy) : null,
        },
      });

      return {
        ...sale,
        profit,
        costOfGoodsSold: totalCost,
      };
    });

    await logActivity({
      userId: createdBy ? parseInt(createdBy) : null,
      action: "CREATE",
      entityType: "SALE",
      entityId: result.saleId,
      entityName: `${result.product.productName} para ${result.customer.customerName}`,
      details: `Venda registrada: ${soldQuantity} unidades de ${
        result.product.productName
      } para ${
        result.customer.customerName
      } a $${salePrice}/unidade (Lucro: $${result.profit.toFixed(2)})`,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar venda:", error);
    return NextResponse.json(
      { error: "Falha ao criar venda" },
      { status: 500 }
    );
  }
}
