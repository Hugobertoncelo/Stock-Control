import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const totalProducts = await prisma.product.count();

    const products = await prisma.product.findMany({
      select: {
        quantity: true,
        unitPrice: true,
      },
    });

    const totalInventoryValue = products.reduce(
      (sum: number, product: { quantity: number; unitPrice: any }) => {
        return sum + product.quantity * Number(product.unitPrice);
      },
      0
    );

    const allProducts = await prisma.product.findMany({
      select: {
        productId: true,
        productName: true,
        sku: true,
        quantity: true,
        minimumQuantity: true,
        maximumQuantity: true,
        unitPrice: true,
        warehouse: true,
      },
    });

    const lowStockProducts = allProducts.filter((product) => {
      const threshold =
        product.minimumQuantity +
        (product.maximumQuantity - product.minimumQuantity) * 0.1;
      return product.quantity <= threshold;
    });

    const productsByWarehouse = await prisma.warehouse.findMany({
      select: {
        warehouseId: true,
        warehouseName: true,
        _count: {
          select: {
            products: true,
          },
        },
      },
    });

    const totalStockQuantity = products.reduce(
      (sum: number, product: { quantity: number; unitPrice: any }) => {
        return sum + product.quantity;
      },
      0
    );

    const recentStockMovements = await prisma.stockMovement.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        product: true,
      },
    });

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentSales = await prisma.sale.findMany({
      where: {
        saleDate: { gte: thirtyDaysAgo },
      },
      include: {
        product: true,
      },
      orderBy: { saleDate: "asc" },
    });

    const profitData = recentSales.map((sale) => {
      const costOfGoodsSold = sale.costOfGoodsSold
        ? parseFloat(sale.costOfGoodsSold.toString())
        : 0;
      const revenue = sale.soldQuantity * parseFloat(sale.salePrice.toString());
      const profit = revenue - costOfGoodsSold;

      return {
        date: sale.saleDate.toISOString().split("T")[0],
        profit,
        sales: sale.soldQuantity,
        revenue,
      };
    });

    const dailyProfitMap = new Map();
    profitData.forEach((item) => {
      if (dailyProfitMap.has(item.date)) {
        const existing = dailyProfitMap.get(item.date);
        existing.profit += item.profit;
        existing.sales += item.sales;
        existing.revenue += item.revenue;
      } else {
        dailyProfitMap.set(item.date, { ...item });
      }
    });

    const dailyProfitData = Array.from(dailyProfitMap.values());
    const totalProfit = dailyProfitData.reduce((sum, d) => sum + d.profit, 0);
    const totalRevenue = dailyProfitData.reduce((sum, d) => sum + d.revenue, 0);

    return NextResponse.json({
      success: true,
      data: {
        totalProducts,
        totalInventoryValue: totalInventoryValue.toFixed(2),
        totalStockQuantity,
        lowStockCount: lowStockProducts.length,
        lowStockProducts,
        productsByWarehouse,
        recentStockMovements,
        profitData: dailyProfitData,
        totalProfit: totalProfit.toFixed(2),
        totalRevenue: totalRevenue.toFixed(2),
      },
    });
  } catch (error: any) {
    console.error("Erro ao buscar estatísticas do painel:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Falha ao buscar estatísticas do painel",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
