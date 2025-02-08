import { DiagConsoleLogger, DiagLogLevel, diag } from "@opentelemetry/api";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { CompressionAlgorithm } from "@opentelemetry/otlp-exporter-base";

// Configure diagnostics logging
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

const exporterOptions = {
	url:
		process.env.OTEL_EXPORTER_OTLP_ENDPOINT ||
		"http://otel-collector:4318/v1/traces",
	headers: {},
	concurrencyLimit: 10, // Limit concurrent requests
	timeoutMillis: 15000, // 15 seconds timeout
	compression: CompressionAlgorithm.GZIP, // Enable compression
	retryConfig: {
		initialRetryDelayMillis: 1000,
		maxRetryDelayMillis: 5000,
		maxAttempts: 3,
	},
};

// Add error handling
const traceExporter = new OTLPTraceExporter(exporterOptions);

export { traceExporter };
