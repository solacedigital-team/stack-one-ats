import { createEnv } from "@t3-oss/env-core";
import dotenv from "dotenv";
import { z } from "zod/v4";

dotenv.config();

export const env = createEnv({
	client: {
		NEXT_PUBLIC_API_BASE_URL: z.string().default("http://localhost:8080"),
	},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
