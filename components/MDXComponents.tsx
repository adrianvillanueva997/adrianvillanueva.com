import Alert from "@/components/markdown/Alert";
import BadgeGroup, { Badge } from "@/components/markdown/Badges";
import { Callout } from "@/components/markdown/Callout";
import CodeBlock from "@/components/markdown/CodeBlock";
import { Details } from "@/components/markdown/Details";
import ImageComparison from "@/components/markdown/ImageComparison";
import ProgressBar from "@/components/markdown/ProgressBar";
import Quote from "@/components/markdown/Quote";
import StatsGrid from "@/components/markdown/StatsGrid";
import { Steps } from "@/components/markdown/Steps";
import Tabs from "@/components/markdown/Tabs";
import { TechStack } from "@/components/markdown/TechStack";
import { Terminal } from "@/components/markdown/Terminal";
import Timeline from "@/components/markdown/Timeline";
import type { MDXComponents } from "mdx/types";
import BlogNewsletterForm from "pliny/ui/BlogNewsletterForm";
import Pre from "pliny/ui/Pre";
import TOCInline from "pliny/ui/TOCInline";
import React from "react";
import Diagram from './Diagram';
import Image from "./Image";
import CustomLink from "./Link";
import TableWrapper from "./TableWrapper";

// Custom pre component that wraps Pliny's Pre with our brutalist aesthetic
function CustomPre({ children, ...props }: { children?: React.ReactNode;[key: string]: unknown }) {
	// Check if this is a code block that has been processed by rehype-prism-plus
	if (React.isValidElement(children) && children.props) {
		const { className = '' } = children.props as {
			className?: string;
		};

		// If it's a code block (has language class), wrap with our styling
		if (className.startsWith('language-')) {
			const language = className.replace('language-', '') || 'text';

			return (
				<div className="my-6 border-4 border-black bg-white overflow-hidden">
					{/* Header */}
					<div className="flex items-center justify-between px-4 py-2 bg-black border-b-4 border-black">
						<div className="flex items-center space-x-3">
							<div className="flex space-x-1">
								<div className="w-3 h-3 border-2 border-white bg-red-500" />
								<div className="w-3 h-3 border-2 border-white bg-yellow-400" />
								<div className="w-3 h-3 border-2 border-white bg-green-500" />
							</div>
							<span className="font-mono text-xs text-white font-black uppercase">
								{language}
							</span>
						</div>
					</div>

					{/* Code Content - let Pliny's Pre handle the syntax highlighted content */}
					<div className="overflow-x-auto bg-gray-50">
						<div className="[&>pre]:bg-gray-50 [&>pre]:border-0 [&>pre]:rounded-none [&>pre]:mt-0 [&>pre]:mb-0 [&>pre]:p-6 [&>pre]:font-mono [&>pre]:text-black">
							<Pre {...props}>
								{children}
							</Pre>
						</div>
					</div>
				</div>
			);
		}
	}

	// Fallback to Pliny's Pre component for other cases
	return <Pre {...props}>{children}</Pre>;
}

export const components: MDXComponents = {
	Image,
	TOCInline,
	Diagram,
	a: CustomLink,
	pre: CustomPre,
	table: TableWrapper,
	BlogNewsletterForm,
	// Enhanced MDX components with brutalist aesthetic
	Callout,
	Details,
	Steps,
	TechStack,
	Terminal,
	// New MDX components
	Alert,
	Badge,
	BadgeGroup,
	CodeBlock,
	ImageComparison,
	ProgressBar,
	Quote,
	StatsGrid,
	Tabs,
	Timeline,
};
