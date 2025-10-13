import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function requireAuth(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }
  const token = authorization.split(" ")[1];
  if (!verifyToken(token)) {
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }
  return null;
}
