import type { AppType } from "@repo/backend/src/types";
import { hc as client, InferResponseType } from "hono/client";
import { env } from "./env";

export const hc = client<AppType>(env.NEXT_PUBLIC_API_BASE_URL);
export type AccountData = InferResponseType<typeof hc.api.accounts.$get, 200>[number];
export type EmployeeData = InferResponseType<typeof hc.api.hris.employees.$get, 200>[number];
