import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { success: false, error: "ID obrigatório" },
      { status: 400 }
    );
  }
  const photo = await prisma.productPhoto.findUnique({
    where: { photoId: parseInt(id) },
  });
  if (!photo || !photo.data) {
    return NextResponse.json(
      { success: false, error: "Imagem não encontrada" },
      { status: 404 }
    );
  }
  return new NextResponse(photo.data, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `inline; filename=${photo.fileName}`,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
