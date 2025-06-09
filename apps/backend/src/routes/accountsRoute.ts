import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import {
	listAccountsByCategory,
	listAllAccounts,
	getAccountById as getAccountByIdService,
} from "../service/accountsService.js";
import { handleErrorResponse } from "./routesErrorHandler.js";
import { NotFoundError } from "../errors/stackoneErrors.js";

export const AccountsRoutes = new Hono()
	.get("/", async (c) => {
		try {
			const accounts = await listAllAccounts();
			return c.json(accounts, 200);
		} catch (error: unknown) {
			return handleErrorResponse(error, c);
		}
	})
    .get('/:id', zValidator('param', z.object({ id: z.string().min(1) })), async (c) => {
        try {
            const { id } = c.req.valid('param');
            const account = await getAccountByIdService(id);
            if (!account) {
								throw new NotFoundError(`Account with id ${id} not found`);
            }
            return c.json(account, 200);
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
