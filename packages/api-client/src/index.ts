import type { AppType } from "@repo/backend/src/types";
import { hc as client } from "hono/client";
import { env } from "./env";

export const hc = client<AppType>(env.NEXT_PUBLIC_API_BASE_URL);
