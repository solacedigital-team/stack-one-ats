import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import {
	listAccountsByCategory,
	listAllAccounts,
} from "../service/accountsService.js";
import { handleErrorResponse } from "./routesErrorHandler.js";

export const AccountsRoutes = new Hono()
	.get("/", async (c) => {
		try {
			const accounts = await listAllAccounts();
			return c.json(accounts, 200);
		} catch (error: unknown) {
			return handleErrorResponse(error, c);
		}
	})
	.get(
		"/category/:category",
		zValidator("param", z.object({ category: z.enum(["hris", "ats"]) })),
		async (c) => {
			try {
				const { category } = c.req.valid("param");
				const accounts = await listAccountsByCategory(category);
				return c.json(accounts, 200);
			} catch (error: unknown) {
				return handleErrorResponse(error, c);
			}
		},
	);
