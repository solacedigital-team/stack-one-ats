import { Hono } from "hono";
import { listAllEmployees } from "../service/hrisService.js";
// import { handleErrorResponse } from "./routesErrorHandler.js";

export const HRISRoutes = new Hono()
    .get("/employees", async (c) => {
        const next = c.req.query("next") || "";
        const accountId = c.req.header("x-account-id") || "";

        try {
            const employees = await listAllEmployees(accountId, next);
            if (!employees || employees.length === 0) {
                return c.json({ message: "No employees found" }, 404);
            }
            return c.json(employees, 200);
        } catch (error: unknown) {
            console.error("Error fetching employees:", error);
            return c.json(
                { message: "An unexpected error occurred." },
                500
            );
        }
    });
