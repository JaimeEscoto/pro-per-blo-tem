const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

interface SupabaseRequestOptions {
  method?: HttpMethod;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  prefer?: string;
}

interface SupabaseErrorPayload {
  message?: string;
}

function assertSupabaseConfig() {
  if (!SUPABASE_URL) {
    throw new Error("SUPABASE_URL no está configurado");
  }
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY no está configurado");
  }
}

export async function supabaseRequest<T>(
  path: string,
  options: SupabaseRequestOptions = {}
): Promise<T> {
  assertSupabaseConfig();

  const method = options.method ?? "GET";
  const url = new URL(`${SUPABASE_URL}/rest/v1/${path}`);

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(options.query ?? {})) {
    if (value === undefined || value === null) continue;
    params.append(key, String(value));
  }
  if ([...params.keys()].length > 0) {
    url.search = params.toString();
  }

  const headers: Record<string, string> = {
    apikey: SUPABASE_SERVICE_ROLE_KEY!,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    Accept: "application/json",
  };

  if (options.prefer) {
    headers.Prefer = options.prefer;
  }

  let body: BodyInit | undefined;
  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(options.body);
  }

  const response = await fetch(url, {
    method,
    headers,
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    let details: string | undefined;
    try {
      const errorPayload = (await response.json()) as SupabaseErrorPayload;
      details = errorPayload.message;
    } catch {
      details = await response.text();
    }
    const message = details
      ? `Error en Supabase (${response.status}): ${details}`
      : `Error en Supabase (${response.status})`;
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
