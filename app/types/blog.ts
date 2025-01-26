export interface BlogPost {
	slug: string;
	metadata: {
		title: string;
		description: string;
		date: string;
		categories?: string[];
		readingTime: number;
		draft: boolean;
	};
}
