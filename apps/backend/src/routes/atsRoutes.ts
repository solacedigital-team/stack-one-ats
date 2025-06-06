import { Hono } from "hono";
import { listAllApplications, listAllJobs } from "../service/atsService.js";
import { handleErrorResponse } from "./routesErrorHandler.js";

export const ATSRoutes = new Hono()
	.get("/jobs", async (c) => {
		const next = c.req.query("next") || "";
		const accountId = c.req.header("x-account-id") || "";

		try {
			const jobs = await listAllJobs(accountId, next);
			console.log({ jobs });
			return c.json(jobs, 200);
		} catch (error: unknown) {
			console.log({ error });
			return handleErrorResponse(error, c);
		}
	})
	.get("/applications", async (c) => {
		const next = c.req.query("next") || "";
		const accountId = c.req.header("x-account-id") || "";

		try {
			const applications = await listAllApplications(accountId, next);
			return c.json(applications, 200);
		} catch (error: unknown) {
			return handleErrorResponse(error, c);
		}
	});
