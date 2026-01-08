import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logActivity } from "@/lib/activityLogger";

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { customerName: "asc" },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error("Erro ao buscar clientes:", error);
    return NextResponse.json(
      { error: "Falha ao buscar clientes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, phone, email, address } = body;
    const userId = request.headers.get("x-user-id");

    if (!customerName) {
      return NextResponse.json(
        { error: "O nome do cliente é obrigatório" },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.create({
      data: {
        customerName,
        phone,
        email,
        address,
      },
    });

    await logActivity({
      userId: userId ? parseInt(userId) : null,
      action: "CREATE",
      entityType: "CUSTOMER",
      entityId: customer.customerId,
      entityName: customer.customerName,
      details: `Cliente criado: ${customer.customerName}`,
    });

    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    return NextResponse.json(
      { error: "Falha ao criar cliente" },
      { status: 500 }
    );
  }
}
