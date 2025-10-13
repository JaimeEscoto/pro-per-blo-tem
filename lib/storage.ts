import { promises as fs } from "fs";
import path from "path";

type JsonValue = Record<string, unknown> | Array<unknown>;

const dataDir = path.join(process.cwd(), "data");

export async function readJson<T>(fileName: string): Promise<T> {
  const filePath = path.join(dataDir, fileName);
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data) as T;
}

export async function writeJson(fileName: string, value: JsonValue): Promise<void> {
  const filePath = path.join(dataDir, fileName);
  await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf-8");
}
