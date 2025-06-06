import { createEnv } from "@t3-oss/env-core";
import dotenv from "dotenv";
import { z } from "zod/v4";

dotenv.config();

export const config = createEnv({
	server: {
		STACKONE_API_KEY: z.string(),
		ORIGIN_OWNER_ID: z.string(),
		ORIGIN_OWNER_NAME: z.string(),
		STACKONE_BASE_URL: z.string().default("https://api.stackone.com"),
		STACKONE_ATS_URL: z
			.string()
			.default("https://api.stackone.com/unified/ats"),
		STACKONE_HRIS_URL: z
			.string()
			.default("https://api.stackone.com/unified/hris"),
		PORT: z.string().default("8080"),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
