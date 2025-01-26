export interface Node {
	id: string;
	label: string;
	type: "category" | "post";
	x: number;
	y: number;
	radius: number;
	slug: string;
	color?: string;
	glowColor?: string;
	glowIntensity?: number;
}

export interface Edge {
	source: string;
	target: string;
	color: string;
	width?: number;
	animate?: boolean;
}
