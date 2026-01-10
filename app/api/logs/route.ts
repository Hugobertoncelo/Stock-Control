import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const logs = await prisma.activityLog.findMany({
      include: {
        user: {
          select: {
            userId: true,
            fullName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error("Erro ao buscar logs de atividade:", error);
    return NextResponse.json(
      { error: "Falha ao buscar logs de atividade" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { logId } = await request.json();
    if (!logId) {
      return NextResponse.json(
        { error: "logId é obrigatório" },
        { status: 400 }
      );
    }
    await prisma.activityLog.delete({ where: { logId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao excluir log de atividade:", error);
    return NextResponse.json(
      { error: "Falha ao excluir log de atividade" },
      { status: 500 }
    );
  }
}
