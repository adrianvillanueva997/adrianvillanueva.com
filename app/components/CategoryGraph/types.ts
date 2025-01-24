export interface Node {
	id: string;
	label: string;
	x: number;
	y: number;
	radius: number;
	type: "category" | "post";
}

export interface Edge {
	source: string;
	target: string;
}