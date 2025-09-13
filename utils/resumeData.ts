import * as fs from "node:fs";
import * as path from "node:path";
import * as yaml from "js-yaml";

// Define TypeScript interfaces for your resume data structure
export interface ResumeData {
	personal: {
		name: string;
		title: string;
		summary: string;
		nationality?: string;
		location?: string;
		email?: string;
	};
	skills: {
		languages?: string[];
		frameworks?: string[];
		cloud?: string[];
		tools?: string[];
		mlops?: string[];
		databases?: string[];
		monitoring?: string[];
		"CI/CD"?: string[];
		other?: string[];
		[key: string]: string[] | undefined;
	};
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	experience?: any[];
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	education?: any[];
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	languages?: any[];
}

export function getResumeData(): ResumeData {
	try {
		// Update the path in getResumeData function
		const filePath = path.join(process.cwd(), "data", "resume", "resume.yaml");

		// Check if file exists
		if (!fs.existsSync(filePath)) {
			console.error(`Resume YAML file not found at: ${filePath}`);
			return {
				personal: {
					name: "Your Name",
					title: "Your Title",
					summary: "Your summary information",
				},
				skills: {},
			};
		}

		// Read and parse YAML file
		const fileContents = fs.readFileSync(filePath, "utf8");
		const data = yaml.load(fileContents) as ResumeData;

		return data;
	} catch (error) {
		console.error("Error loading resume data:", error);
		// Return fallback data if there's an error
		return {
			personal: {
				name: "Your Name",
				title: "Your Title",
				summary: "Error loading resume data.",
			},
			skills: {},
		};
	}
}
