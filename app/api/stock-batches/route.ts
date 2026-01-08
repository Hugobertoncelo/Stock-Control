import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "O ID do produto é obrigatório" },
        { status: 400 }
      );
    }

    const stockBatches = await prisma.stockBatch.findMany({
      where: {
        productId: parseInt(productId),
      },
      include: {
        purchase: {
          include: {
            supplier: true,
          },
        },
      },
      orderBy: { batchDate: "desc" },
    });

    return NextResponse.json(stockBatches);
  } catch (error) {
    console.error("Erro ao obter os lotes de estoque:", error);
    return NextResponse.json(
      { error: "Falha ao obter os lotes de estoque" },
      { status: 500 }
    );
  }
}
