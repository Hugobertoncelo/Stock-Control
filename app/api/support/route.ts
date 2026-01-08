import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/emailService";

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Endereço de email inválido" },
        { status: 400 }
      );
    }

    const supportEmail = process.env.SUPPORT_EMAIL || process.env.EMAIL_USER;

    if (!supportEmail) {
      console.error(
        "SUPPORT_EMAIL ou EMAIL_USER não configurados no arquivo .env"
      );
      return NextResponse.json(
        { success: false, error: "Email de suporte não configurado" },
        { status: 500 }
      );
    }

    await sendEmail({
      to: supportEmail,
      subject: `Solicitação de suporte: ${subject}`,
      text: `
Nova solicitação de suporte do Sistema de Inventário PrimeGestor

Name: ${name}
Email: ${email}
Subject: ${subject}

Mensagem:
${message}

---
Responder para: ${email}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #1f2937; padding-bottom: 10px;">
            Nova Solicitação de Suporte
          </h2>
          <p style="color: #6b7280;">Do Sistema de Inventário PrimeGestor</p>

          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Nome:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 5px 0;"><strong>Assunto:</strong> ${subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #1f2937;">Mensagem:</h3>
            <p style="color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              Responder para: <a href="mailto:${email}">${email}</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Solicitação de suporte enviada com sucesso",
    });
  } catch (error: any) {
    console.error("Erro ao enviar email de suporte:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Falha ao enviar solicitação de suporte",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
