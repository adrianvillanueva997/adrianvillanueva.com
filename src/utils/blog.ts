export interface BlogPost {
	title: string;
	link: string;
	pubDate?: string;
}

export async function getLatestBlogPost(): Promise<BlogPost | null> {
	try {
		const response = await fetch('https://metalops.dev/rss.xml');
		if (!response.ok) throw new Error('Failed to fetch RSS feed');
		
		const xml = await response.text();
		
		// Extract first item (latest post)
		const itemMatch = xml.match(/<item>([\s\S]*?)<\/item>/);
		if (!itemMatch) return null;
		
		const itemContent = itemMatch[1];
		
		const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/);
		const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/);
		const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
		
		if (titleMatch && linkMatch) {
			return {
				title: titleMatch[1].trim(),
				link: linkMatch[1].trim(),
				pubDate: pubDateMatch ? pubDateMatch[1].trim() : undefined,
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
