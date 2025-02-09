import { DiagConsoleLogger, DiagLogLevel, diag } from "@opentelemetry/api";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { CompressionAlgorithm } from "@opentelemetry/otlp-exporter-base";
// Configure diagnostics logging
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

const baseOptions = {
	concurrencyLimit: 10,
	timeoutMillis: 15000,
	compression: CompressionAlgorithm.GZIP,
	retryConfig: {
		initialRetryDelayMillis: 1000,
		maxRetryDelayMillis: 5000,
		maxAttempts: 3,
	},
};

const OTEL_TRACES_URL =
	process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT ||
	"http://otel-collector:4318/v1/traces";
// Trace Exporter Configuration
const traceExporter = new OTLPTraceExporter({
	...baseOptions,
	url: OTEL_TRACES_URL,
});


export { traceExporter };

