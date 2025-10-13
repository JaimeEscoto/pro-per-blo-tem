import { NextRequest, NextResponse } from "next/server";
import { deleteProject, getProjectById, updateProject } from "@/lib/projects";
import { requireAuth } from "@/lib/api";

interface Params {
  params: { id: string };
}

export async function GET(_request: NextRequest, { params }: Params) {
  const project = await getProjectById(params.id);
  if (!project) {
    return NextResponse.json({ message: "Proyecto no encontrado" }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;
  const payload = await request.json();
  const updated = await updateProject(params.id, payload);
  if (!updated) {
    return NextResponse.json({ message: "Proyecto no encontrado" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const authResponse = requireAuth(request);
  if (authResponse) return authResponse;
  const deleted = await deleteProject(params.id);
  if (!deleted) {
    return NextResponse.json({ message: "Proyecto no encontrado" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
