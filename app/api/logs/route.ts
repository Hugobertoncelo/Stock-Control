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
