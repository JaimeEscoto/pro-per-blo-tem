import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { requireAuth } from "@/lib/api";

const uploadDir = path.join(process.cwd(), "public", "uploads");

export async function POST(request: NextRequest) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ message: "Archivo requerido" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const ext = path.extname(file.name) || ".png";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
  const filePath = path.join(uploadDir, fileName);

  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(filePath, buffer);

  return NextResponse.json({ url: `/uploads/${fileName}` }, { status: 201 });
}
