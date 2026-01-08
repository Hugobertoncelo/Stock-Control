import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logActivity } from "@/lib/activityLogger";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = request.headers.get("x-user-id");
    const { id } = await params;
    const warehouseId = parseInt(id);
    const body = await request.json();
    const { warehouseName, location } = body;

    if (!warehouseName) {
      return NextResponse.json(
        { error: "O nome da cor é obrigatório" },
        { status: 400 }
      );
    }

    const warehouse = await prisma.warehouse.update({
      where: { warehouseId },
      data: {
        warehouseName,
        location: location || null,
      },
    });

    if (userId) {
      await logActivity({
        userId: parseInt(userId),
        action: "UPDATE",
        entityType: "WAREHOUSE",
        entityId: warehouseId,
        details: `Cor atualizada: ${warehouseName}`,
      });
    }

    return NextResponse.json({
      success: true,
      data: warehouse,
    });
  } catch (error: any) {
    console.error("Erro ao atualizar cor:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Falha ao atualizar cor",
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
    const userId = request.headers.get("x-user-id");
    const { id } = await params;
    const warehouseId = parseInt(id);

    const warehouse = await prisma.warehouse.findUnique({
      where: { warehouseId },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!warehouse) {
      return NextResponse.json(
        { error: "Cor não encontrada" },
        { status: 404 }
      );
    }

    if (warehouse._count.products > 0) {
      return NextResponse.json(
        {
          error: `Não é possível excluir a cor com ${warehouse._count.products} produtos. Mova ou exclua todos os produtos primeiro.`,
        },
        { status: 400 }
      );
    }

    await prisma.warehouse.delete({
      where: { warehouseId },
    });

    if (userId) {
      await logActivity({
        userId: parseInt(userId),
        action: "DELETE",
        entityType: "WAREHOUSE",
        entityId: warehouseId,
        details: `Cor excluída: ${warehouse.warehouseName}`,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Cor excluída com sucesso",
    });
  } catch (error: any) {
    console.error("Erro ao excluir cor:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Falha ao excluir cor",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
