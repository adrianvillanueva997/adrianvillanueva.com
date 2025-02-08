import { registerOTel } from "@vercel/otel";
import { traceExporter } from "./instrumentation.node";

export function register() {
	registerOTel({
		serviceName: "adrianvillanueva.com",
		traceExporter: traceExporter,
	});
}
