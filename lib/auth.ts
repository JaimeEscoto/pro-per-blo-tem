import jwt from "jsonwebtoken";
import crypto from "crypto";

const DEFAULT_EMAIL = "admin@anarodriguez.dev";
const DEFAULT_PASSWORD_HASH = "bd881cdf358834e8bef278a51fdfa044a967bc0fa8233032190d4fbcd8238320";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? DEFAULT_EMAIL;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH ?? DEFAULT_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET ?? "super-secret-change-me";

interface TokenPayload {
  email: string;
}

export function verifyCredentials(email: string, password: string): boolean {
  if (!email || !password) return false;
  const passwordHash = crypto.createHash("sha256").update(password).digest("hex");
  const emailMatches = timingSafeEqual(email.toLowerCase(), ADMIN_EMAIL.toLowerCase());
  const passwordMatches = timingSafeEqual(passwordHash, ADMIN_PASSWORD_HASH);
  return emailMatches && passwordMatches;
}

function timingSafeEqual(value: string, expected: string) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);
  if (valueBuffer.length !== expectedBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(valueBuffer, expectedBuffer);
}

export function signToken(email: string) {
  return jwt.sign({ email } satisfies TokenPayload, JWT_SECRET, { expiresIn: "12h" });
}

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
}
