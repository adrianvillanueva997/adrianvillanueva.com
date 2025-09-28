"use client";

import { ThemeProvider } from "next-themes";

export function ThemeProviders({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="light"
			forcedTheme="light"
			enableSystem={false}
			enableColorScheme={false}
		>
			{children}
		</ThemeProvider>
	);
}
