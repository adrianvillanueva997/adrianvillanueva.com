/**
 * Performance monitoring and analytics utilities
 */

declare global {
	const gtag: (command: string, ...args: unknown[]) => void;
}

interface Metric {
	name: string;
	value: number;
	id: string;
}

// Web Vitals tracking (placeholder - requires web-vitals package)
export function trackWebVitals() {
	if (typeof window !== "undefined" && "performance" in window) {
		// Note: Install web-vitals package for full functionality
		console.log("Web vitals tracking initialized");
	}
}

// Send metrics to analytics service
function sendToAnalytics(metric: Metric) {
	// In production, send to your analytics service
	if (process.env.NODE_ENV === "production") {
		// Example: Google Analytics 4
		if (typeof gtag !== "undefined") {
			gtag("event", metric.name, {
				event_category: "Web Vitals",
				value: Math.round(
					metric.name === "CLS" ? metric.value * 1000 : metric.value,
				),
				event_label: metric.id,
				non_interaction: true,
			});
		}
	} else {
		// Development logging
		console.log("Web Vital:", metric);
	}
}

// Error tracking
export function trackError(error: Error, errorInfo?: Record<string, unknown>) {
	if (process.env.NODE_ENV === "production") {
		// Send to error tracking service (e.g., Sentry)
		console.error("Application Error:", error, errorInfo);
	} else {
		console.error("Development Error:", error, errorInfo);
	}
}

// Page view tracking
export function trackPageView(url: string, title: string) {
	if (process.env.NODE_ENV === "production" && typeof gtag !== "undefined") {
		gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "", {
			page_title: title,
			page_location: url,
		});
	}
}

// Custom event tracking
export function trackEvent(
	eventName: string,
	parameters: Record<string, unknown> = {},
) {
	if (process.env.NODE_ENV === "production" && typeof gtag !== "undefined") {
		gtag("event", eventName, parameters);
	} else {
		console.log("Event:", eventName, parameters);
	}
}

// Performance observer for custom metrics
export function observePerformance() {
	if (typeof window !== "undefined" && "PerformanceObserver" in window) {
		// Observe navigation timing
		const navObserver = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				if (entry.entryType === "navigation") {
					const navEntry = entry as PerformanceNavigationTiming;

					// Track custom timing metrics
					trackEvent("navigation_timing", {
						dns_time: navEntry.domainLookupEnd - navEntry.domainLookupStart,
						tcp_time: navEntry.connectEnd - navEntry.connectStart,
						request_time: navEntry.responseEnd - navEntry.requestStart,
						dom_content_loaded:
							navEntry.domContentLoadedEventEnd - navEntry.startTime,
						load_complete: navEntry.loadEventEnd - navEntry.startTime,
					});
				}
			}
		});

		navObserver.observe({ entryTypes: ["navigation"] });

		// Observe resource timing for critical resources
		const resourceObserver = new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				const resourceEntry = entry as PerformanceResourceTiming;

				// Track slow resources
				if (resourceEntry.duration > 1000) {
					trackEvent("slow_resource", {
						resource_name: resourceEntry.name,
						duration: resourceEntry.duration,
						size: resourceEntry.transferSize || 0,
					});
				}
			}
		});

		resourceObserver.observe({ entryTypes: ["resource"] });
	}
}

// Cyber-doom specific metrics
export function trackCyberDoomMetrics() {
	// Track animation performance
	if (typeof window !== "undefined") {
		const animationElements = document.querySelectorAll(
			'[class*="animate-"], [class*="doom-"], [class*="synthwave-"]',
		);

		trackEvent("cyber_doom_elements", {
			animated_elements_count: animationElements.length,
			theme: "cyber-doom",
		});

		// Track particle field performance if present
		const particleField = document.querySelector(".particle-field");
		if (particleField) {
			trackEvent("particle_field_loaded", {
				element_present: true,
			});
		}
	}
}
