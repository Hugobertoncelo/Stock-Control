import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateResetToken, sendPasswordResetEmail } from "@/lib/emailService";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "O e-mail é obrigatório" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          error:
            "Por favor, entre em contato com o administrador para obter as credenciais de acesso. No momento, você não está conectado ao sistema.",
        },
        { status: 404 }
      );
    }

    const resetToken = generateResetToken();
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    await prisma.user.update({
      where: { userId: user.userId },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    try {
      await sendPasswordResetEmail(user.email, user.fullName, resetToken);
    } catch (emailError) {
      console.error("Falha ao enviar o e-mail:", emailError);
      return NextResponse.json(
        {
          error:
            "Falha ao enviar o e-mail de redefinição. Verifique a configuração do e-mail.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message:
          "Se uma conta com esse e-mail existir, um link de redefinição de senha foi enviado.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erro ao recuperar a senha:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro ao processar sua solicitação" },
      { status: 500 }
    );
  }
}
