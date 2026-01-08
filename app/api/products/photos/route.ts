import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logActivity } from "@/lib/activityLogger";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const productId = searchParams.get("productId");

    const where: any = {};
    if (productId) where.productId = parseInt(productId);
    if (search) {
      where.OR = [
        { fileName: { contains: search, mode: "insensitive" } },
        { url: { contains: search, mode: "insensitive" } },
      ];
    }

    const photos = await prisma.productPhoto.findMany({
      where,
      include: { product: true },
      orderBy: { uploadedAt: "desc" },
    });
    return NextResponse.json({ success: true, data: photos });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const productId = formData.get("productId");
    const file = formData.get("file");
    if (!productId || !file || typeof file === "string") {
      return NextResponse.json(
        { success: false, error: "Dados inválidos." },
        { status: 400 }
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const photo = await prisma.productPhoto.create({
      data: {
        productId: parseInt(productId as string),
        fileName: file.name,
        data: buffer,
        url: "",
      },
    });
    await logActivity({
      userId: null,
      action: "CREATE",
      entityType: "PRODUCT_PHOTO",
      entityId: photo.photoId,
      entityName: photo.fileName,
      details: `Foto enviada para produto ${productId}`,
    });
    return NextResponse.json({ success: true, data: photo });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { success: false, error: "ID obrigatório" },
      { status: 400 }
    );
  }
  try {
    await prisma.productPhoto.delete({ where: { photoId: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
