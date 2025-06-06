import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { AccountsRoutes } from "./routes/accountsRoute.js";
import { ATSRoutes } from "./routes/atsRoutes.js";
import { ConnectRoutes } from "./routes/connectRoute.js";
import { HRISRoutes } from "./routes/hrisRoutes.js";

const app = new Hono({ strict: true }).basePath("/api");

export const routes = app
	.use("*", cors())
	.route("/session-token", ConnectRoutes)
	.route("/accounts", AccountsRoutes)
	.route("/ats", ATSRoutes)
	.route("/hris", HRISRoutes);

serve(
	{
		fetch: app.fetch,
		port: Number(process.env.PORT),
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
