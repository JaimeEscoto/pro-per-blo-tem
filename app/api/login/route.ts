import { NextResponse } from "next/server";
import { signToken, verifyCredentials } from "@/lib/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const isValid = verifyCredentials(email, password);
  if (!isValid) {
    return NextResponse.json({ message: "Credenciales inválidas" }, { status: 401 });
  }
  const token = signToken(email);
  return NextResponse.json({ token });
}
