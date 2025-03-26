"use client";

import { MDXRemote } from "next-mdx-remote";
import { serialize } from 'next-mdx-remote/serialize';
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { highlight } from "sugar-high";
import { Callout } from "./post/Callout";
import { Categories } from "./post/Categories";
import { Details } from "./post/Details";
import { Steps } from "./post/Steps";
import { TechStack } from "./post/TechStack";
import { Terminal } from "./post/Terminal";

// Dynamic imports for client components
const Mermaid = dynamic(() => import("./post/Mermaid").then(mod => mod.Mermaid), {
	ssr: false
});

const CodeBlock = dynamic(() => import("./post/SyntaxHighlighter").then(mod => mod.CodeBlock), {
	ssr: false
});

function Table({ data }) {
	const headers = data.headers.map((header) => (
		<th key={`header-${header}`}>{header}</th>
	));
	const rows = data.rows.map((row) => {
		const rowKey = row.join("-");
		return (
			<tr key={rowKey}>
				{row.map((cell) => (
					<td key={`${rowKey}-${cell}`}>{cell}</td>
				))}
			</tr>
		);
	});

	return (
		<table>
			<thead>
				<tr>{headers}</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
	);
}

function CustomLink(props) {
	const href = props.href;

	if (href.startsWith("/")) {
		return (
			<Link href={href} {...props}>
				{props.children}
			</Link>
		);
	}

	if (href.startsWith("#")) {
		return <a {...props} />;
	}

	return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
	return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function Code({ children, className, ...props }) {
	const language = className ? className.replace("language-", "") : "";

	// Handle Mermaid code blocks
	if (language === "mermaid") {
		return <Mermaid code={children} />;
	}

	// Default code block highlighting
	return (
		<pre {...props}>
			<code>{highlight(children)}</code>
		</pre>
	);
}

function slugify(str) {
	return str
		.toString()
		.toLowerCase()
		.trim() // Remove whitespace from both ends of a string
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/&/g, "-and-") // Replace & with 'and'
		.replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
		.replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level) {
	const Heading = ({ children }) => {
		const slug = slugify(children);
		return React.createElement(
			`h${level}`,
			{ id: slug },
			[
				React.createElement("a", {
					href: `#${slug}`,
					key: `link-${slug}`,
					className: "anchor",
				}),
			],
			children,
		);
	};

	Heading.displayName = `Heading${level}`;

	return Heading;
}

const components = {
	h1: createHeading(1),
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	h5: createHeading(5),
	h6: createHeading(6),
	Image: (props) => (
		<div className="flex justify-center items-center my-6">
			<Image
				{...props}
				className="rounded-lg"
				quality={100}
				sizes="(min-width: 768px) 42rem, 100vw"
			/>
		</div>
	),
	a: CustomLink,
	pre: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
	code: ({ children, className }: { children: string; className?: string }) => {
		if (className === "language-mermaid") {
			return <Mermaid code={children} />;
		}
		const language = className?.replace("language-", "");
		return <CodeBlock language={language}>{children}</CodeBlock>;
	},
	Table,
	Categories,
	Callout,
	Details,
	Terminal,
	TechStack,
	Steps,
};

// Move serialization outside the component
async function serializeMDX(source: string) {
	return await serialize(source, {
		parseFrontmatter: true,
		mdxOptions: {
			development: process.env.NODE_ENV === 'development',
		},
	});
}

// Make this a client component that receives the serialized content
function MDXComponent({ mdxSource }) {
	return (
	  <MDXRemote
		  {...mdxSource}
		  components={components}
	  />
  );
}

// Split into two parts: serialization and rendering
export async function CustomMDX({ source }: { source: string }) {
	const mdxSource = await serializeMDX(source);

	return <MDXComponent mdxSource={mdxSource} />;
}
