import { NextResponse } from "next/server";

export async function GET() {
	try {
		// Basic health checks
		const healthStatus = {
			status: "healthy",
			timestamp: new Date().toISOString(),
			uptime: process.uptime(),
			version: process.env.npm_package_version || "unknown",
			environment: process.env.NODE_ENV || "unknown",
			checks: {
				memory: {
					usage: process.memoryUsage(),
					status: "ok",
				},
				disk: {
					status: "ok", // Could add actual disk check
				},
			},
		};

		// Check if we're in a healthy state
		const memoryUsage = process.memoryUsage();
		const maxMemory = 512 * 1024 * 1024; // 512MB limit

		if (memoryUsage.heapUsed > maxMemory) {
			healthStatus.status = "degraded";
			healthStatus.checks.memory.status = "warning";
		}

		return NextResponse.json(healthStatus, {
			status: healthStatus.status === "healthy" ? 200 : 503,
			headers: {
				"Cache-Control": "no-cache, no-store, must-revalidate",
				Pragma: "no-cache",
				Expires: "0",
			},
		});
	} catch (error) {
		return NextResponse.json(
			{
				status: "unhealthy",
				timestamp: new Date().toISOString(),
				error: "Health check failed",
			},
			{
				status: 503,
				headers: {
					"Cache-Control": "no-cache, no-store, must-revalidate",
				},
			},
		);
	}
}
