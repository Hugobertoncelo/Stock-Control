import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const suppliers = await prisma.supplier.findMany({
      orderBy: { supplierName: "asc" },
    });

    const data = suppliers.map((supplier) => ({
      "Supplier ID": supplier.supplierId,
      "Supplier Name": supplier.supplierName,
      "Contact Person": supplier.contactPerson || "N/A",
      Phone: supplier.phone || "N/A",
      Email: supplier.email || "N/A",
      Address: supplier.address || "N/A",
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao obter o relatório de fornecedores:", error);
    return NextResponse.json(
      { error: "Falha ao obter o relatório de fornecedores" },
      { status: 500 }
    );
  }
}
