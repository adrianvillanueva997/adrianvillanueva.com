import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { defineEcConfig } from "astro-expressive-code";

export default defineEcConfig({
	themes: ["dracula", "github-light"],
	plugins: [pluginLineNumbers()],
	styleOverrides: {
		// You can also override styles
		borderRadius: "0.5rem",
		frames: {
			shadowColor: "#124",
		},
	},
});
