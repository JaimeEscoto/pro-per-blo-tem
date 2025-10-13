import { readJson } from "@/lib/storage";
import type { SiteStats } from "@/types";

const FILE_NAME = "stats.json";

export async function getStats(): Promise<SiteStats> {
  return readJson<SiteStats>(FILE_NAME);
}
