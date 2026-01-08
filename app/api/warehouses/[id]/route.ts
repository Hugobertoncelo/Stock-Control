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
        { error: "O nome da loja é obrigatório" },
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
        details: `Loja atualizada: ${warehouseName}`,
      });
    }

    return NextResponse.json({
      success: true,
      data: warehouse,
    });
  } catch (error: any) {
    console.error("Erro ao atualizar loja:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Falha ao atualizar loja",
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
        { error: "Loja não encontrada" },
        { status: 404 }
      );
    }

    if (warehouse._count.products > 0) {
      return NextResponse.json(
        {
          error: `Não é possível excluir a loja com ${warehouse._count.products} produtos. Mova ou exclua todos os produtos primeiro.`,
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
        details: `Loja excluída: ${warehouse.warehouseName}`,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Loja excluída com sucesso",
    });
  } catch (error: any) {
    console.error("Erro ao excluir loja:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Falha ao excluir loja",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
