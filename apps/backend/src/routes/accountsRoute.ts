import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import {
    listAccountsByCategory,
    listAllAccounts,
    getAccountById as getAccountByIdService,
} from "../service/accountsService.js";

export const AccountsRoutes = new Hono()
    .get("/", async (c) => {
        try {
            const accounts = await listAllAccounts();
            if (!accounts || accounts.length === 0) {
                return c.json({ message: "No accounts found" }, 404);
            }
            return c.json(accounts, 200);
        } catch (error: unknown) {
            console.error("Error fetching accounts:", error);
            return c.json(
                { message: "An unexpected error occurred." },
                500
            );
        }
    })
    .get('/:id', zValidator('param', z.object({ id: z.string().min(1) })), async (c) => {
        try {
            const { id } = c.req.valid('param');
            const account = await getAccountByIdService(id);
            return c.json(account, 200);
        } catch (error: unknown) {
            console.error("Error fetching account by ID:", error);
            return c.json(
                { message: "An unexpected error occurred." },
                500
            );
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
                console.error("Error fetching accounts by category:", error);
                return c.json(
                    { message: "An unexpected error occurred." },
                    500
                );
            }
        },
    );
