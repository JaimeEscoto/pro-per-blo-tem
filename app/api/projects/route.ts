import { NextRequest, NextResponse } from "next/server";
import { createProject, getProjects } from "@/lib/projects";
import { requireAuth } from "@/lib/api";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;

  const payload = await request.json();
  const requiredFields = ["id", "name", "description", "excerpt", "technologies", "role", "year"] as const;
  const missing = requiredFields.filter((field) => !payload[field]);
  if (missing.length > 0) {
    return NextResponse.json({ message: `Campos faltantes: ${missing.join(", ")}` }, { status: 400 });
  }
  const project = await createProject(payload);
  return NextResponse.json(project, { status: 201 });
}
