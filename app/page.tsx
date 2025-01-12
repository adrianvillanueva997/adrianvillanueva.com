import { BlogPosts } from "app/components/posts";
import Skills from "./components/skills";

export default function Page() {
  return (
			<section>
				<h1 className="mb-2 text-2xl font-semibold tracking-tighter">
					Adrian Villanueva Martinez
				</h1>
				<div className="w-[50px] h-[2px] bg-neutral-800 dark:bg-neutral-200 mb-8" />
				<h2 className="mb-4 text-lg font-medium tracking-tight text-neutral-800 dark:text-neutral-200">
					Senior Software Engineer, currently in 🇯🇵
				</h2>
				<p className="mb-4">
					{`I'm a Software Engineer passionate about data engineering, cloud architecture, systems design
        and technical writing.`}
				</p>
				<p className="mb-4">
					{`I enjoy experimenting with new technologies and finding creative ways
        to combine them create to cool solutions. This is my personal space on the internet to share my thoughts and technical writings.`}
				</p>
				<div className="my-8">
					<BlogPosts limit={5} />
				</div>
				<Skills />
			</section>
		);
}
