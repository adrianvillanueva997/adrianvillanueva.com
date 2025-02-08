import { DiagConsoleLogger, DiagLogLevel, diag } from "@opentelemetry/api";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { CompressionAlgorithm } from "@opentelemetry/otlp-exporter-base";
// Configure diagnostics logging
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ERROR);

const baseOptions = {
	headers: {},
	concurrencyLimit: 10,
	timeoutMillis: 15000,
	compression: CompressionAlgorithm.GZIP,
	retryConfig: {
		initialRetryDelayMillis: 1000,
		maxRetryDelayMillis: 5000,
		maxAttempts: 3,
	},
};

// Trace Exporter Configuration
const traceExporter = new OTLPTraceExporter({
	...baseOptions,
	url:
		process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT ||
		"http://otel-collector:4318/v1/traces",
});

// Metrics Exporter Configuration
const metricExporter = new OTLPMetricExporter({
	...baseOptions,
	url:
		process.env.OTEL_EXPORTER_OTLP_METRICS_ENDPOINT ||
		"http://otel-collector:4318/v1/metrics",
});
// Logs Exporter Configuration
const logsExporter = new OTLPLogExporter({
	...baseOptions,
	url:
		process.env.OTEL_EXPORTER_OTLP_LOGS_ENDPOINT ||
		"http://otel-collector:4318/v1/logs",
});

export { logsExporter, metricExporter, traceExporter };

