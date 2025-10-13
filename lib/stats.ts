import { supabaseRequest } from "@/lib/supabase";
import type { SiteStats } from "@/types";

const TABLE = "site_stats";

interface StatsRow {
  id: string;
  total_visits: number | null;
  newsletter_subscribers: number | null;
  monthly: Array<{ month?: string; visits?: number }> | null;
}

function mapMonthly(
  monthly: Array<{ month?: string; visits?: number }> | null
): SiteStats["monthly"] {
  if (!Array.isArray(monthly)) return [];
  return monthly
    .map((item) => ({
      month: typeof item.month === "string" ? item.month : "",
      visits: typeof item.visits === "number" ? item.visits : Number(item.visits ?? 0),
    }))
    .filter((item) => item.month);
}

function mapStats(row: StatsRow): SiteStats {
  return {
    totalVisits: row.total_visits ?? 0,
    newsletterSubscribers: row.newsletter_subscribers ?? 0,
    monthly: mapMonthly(row.monthly),
  };
}

export async function getStats(): Promise<SiteStats> {
  const data = await supabaseRequest<StatsRow[]>(TABLE, {
    query: {
      select: "*",
      limit: "1",
    },
  });
  const row = data?.[0];
  return row
    ? mapStats(row)
    : {
        totalVisits: 0,
        newsletterSubscribers: 0,
        monthly: [],
      };
}
