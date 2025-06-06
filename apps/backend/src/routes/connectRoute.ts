import { Hono } from "hono";
import { connectStackOneSession } from "../service/sessionTokenService.js";
import { handleErrorResponse } from "./routesErrorHandler.js";

export const ConnectRoutes = new Hono().post("/connect-session", async (c) => {
	try {
		const sessionToken = await connectStackOneSession();

		if (!sessionToken) return c.json({ token: null }, 401);

		return c.json(sessionToken, 200);
	} catch (error: unknown) {
		return handleErrorResponse(error, c);
	}
});
