export interface BlogPost {
	title: string;
	pubDate?: string;
	description?: string;
}

export async function getLatestBlogPost(): Promise<BlogPost | null> {
	try {
		const response = await fetch('https://metalops.dev/api/v1/blog/latest');
		if (!response.ok) throw new Error('Failed to fetch latest blog post');
		
		const data = await response.json();
		
		if (data && data.title) {
			return {
				title: data.title,
				pubDate: data.pubDate,
				description: data.description,
			};
		}
	} catch (error) {
		console.error('Failed to fetch latest blog post:', error);
	}
	
	return null;
}

export function formatDate(dateString: string): string {
	try {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'short', 
			day: 'numeric' 
		});
	} catch {
		return dateString;
	}
}
