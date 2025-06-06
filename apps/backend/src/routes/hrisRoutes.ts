import { Hono } from "hono";
import { listAllEmployees } from "../service/hrisService.js";
import { handleErrorResponse } from "./routesErrorHandler.js";

export const HRISRoutes = new Hono().get("/employees", async (c) => {
	const next = c.req.query("next") || "";
	const accountId = c.req.header("x-account-id") || "";

	try {
		const employees = await listAllEmployees(accountId, next);
		return c.json(employees, 200);
	} catch (error: unknown) {
		return handleErrorResponse(error, c);
	}
});
