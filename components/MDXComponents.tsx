import { Callout } from "@/components/markdown/Callout";
import { Details } from "@/components/markdown/Details";
import { Steps } from "@/components/markdown/Steps";
import { TechStack } from "@/components/markdown/TechStack";
import { Terminal } from "@/components/markdown/Terminal";
import type { MDXComponents } from "mdx/types";
import BlogNewsletterForm from "pliny/ui/BlogNewsletterForm";
import Pre from "pliny/ui/Pre";
import TOCInline from "pliny/ui/TOCInline";
import Diagram from './Diagram';
import Image from "./Image";
import CustomLink from "./Link";
import TableWrapper from "./TableWrapper";
export const components: MDXComponents = {
	Image,
	TOCInline,
	Diagram,
	a: CustomLink,
	pre: Pre,
	table: TableWrapper,
	BlogNewsletterForm,
	// Custom MDX components
	Callout,
	Details,
	Steps,
	TechStack,
	Terminal,
};
