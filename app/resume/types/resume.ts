export interface Resume {
	personal: {
		name: string;
		title: string;
		nationality: string;
		email: string;
		location: string;
		summary: string;
	};
	experience: {
		company: string;
		position: string;
		location: string;
		startDate: string;
		endDate: string;
		highlights: string[];
	}[];
	education: {
		institution: string;
		degree: string;
		location: string;
		startDate: string;
		endDate: string;
	}[];
	skills: {
		[category: string]: string[];
	};
	languages: {
		name: string;
		level: string;
	}[];
	certifications: {
		name: string;
		issuer: string;
		date: string;
	}[];
}