import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logActivity } from "@/lib/activityLogger";

export async function GET() {
  try {
    const warehouses = await prisma.warehouse.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
      orderBy: {
        warehouseName: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: warehouses,
    });
  } catch (error: any) {
    console.error("Erro ao buscar armazéns:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Falha ao buscar armazéns",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const body = await request.json();
    const { warehouseName, location } = body;

    if (!warehouseName) {
      return NextResponse.json(
        { error: "O nome do armazém é obrigatório" },
        { status: 400 }
      );
    }

    const warehouse = await prisma.warehouse.create({
      data: {
        warehouseName,
        location: location || null,
      },
    });

    if (userId) {
      await logActivity({
        userId: parseInt(userId),
        action: "CREATE",
        entityType: "WAREHOUSE",
        entityId: warehouse.warehouseId,
        details: `Cor criada: ${warehouseName}`,
      });
    }

    return NextResponse.json(
      {
        success: true,
        data: warehouse,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erro ao criar cor:", error);
    return NextResponse.json(
      { error: "Falha ao criar cor", message: error.message },
      { status: 500 }
    );
  }
}
