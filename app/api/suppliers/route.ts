import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logActivity } from "@/lib/activityLogger";

export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany({
      orderBy: { supplierName: "asc" },
    });

    return NextResponse.json(suppliers);
  } catch (error) {
    console.error("Erro ao buscar fornecedores:", error);
    return NextResponse.json(
      { error: "Falha ao buscar fornecedores" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { supplierName, contactPerson, phone, email, address } = body;
    const userId = request.headers.get("x-user-id");

    if (!supplierName) {
      return NextResponse.json(
        { error: "O nome do fornecedor é obrigatório" },
        { status: 400 }
      );
    }

    const supplier = await prisma.supplier.create({
      data: {
        supplierName,
        contactPerson,
        phone,
        email,
        address,
      },
    });

    await logActivity({
      userId: userId ? parseInt(userId) : null,
      action: "CREATE",
      entityType: "SUPPLIER",
      entityId: supplier.supplierId,
      entityName: supplier.supplierName,
      details: `Fornecedor criado: ${supplier.supplierName}`,
    });

    return NextResponse.json(supplier, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar fornecedor:", error);
    return NextResponse.json(
      { error: "Falha ao criar fornecedor" },
      { status: 500 }
    );
  }
}
