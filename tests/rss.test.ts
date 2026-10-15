import assert from "node:assert/strict";
import { test } from "node:test";
import snapshot from "../src/data/metalops.json" with { type: "json" };
import { fetchRssPosts, parseRss } from "../src/utils/rss.ts";
import { formatPostDate, loadWriting } from "../src/utils/writing.ts";

test("RSS decodes text, sorts publication dates, and rejects unsafe links", () => {
	const posts = parseRss(`<rss><channel>
    <item><title>Old &amp; useful</title><link>https://metalops.dev/old/</link><pubDate>2026-01-01</pubDate></item>
    <item><title><![CDATA[<b>New</b>]]></title><link>https://metalops.dev/new/</link><description>&lt;p&gt;Rust &amp; logs&lt;/p&gt;</description><pubDate>2026-09-14</pubDate></item>
    <item><title>Undated</title><link>https://metalops.dev/undated/</link><pubDate>broken</pubDate></item>
    <item><title>Unsafe</title><link>javascript:alert(1)</link></item>
    <item><title>Relative</title><link>/relative</link></item>
  </channel></rss>`);
	assert.deepEqual(
		posts.map((post) => post.title),
		["New", "Old & useful", "Undated"],
	);
	assert.equal(posts[0].description, "Rust & logs");
	assert.equal(posts[0].date, "2026-09-14T00:00:00.000Z");
	assert.equal(posts[2].date, "");
	assert.equal(formatPostDate(posts[0].date), "14 Sept 2026");
	assert.equal(formatPostDate(""), "Undated");
	assert.deepEqual(parseRss("not XML"), []);
});

test("feed errors never remove the article snapshot and one request is shared", async () => {
	const original = globalThis.fetch;
	let requests = 0;
	try {
		globalThis.fetch = async () => {
			requests++;
			throw new Error("offline");
		};
		assert.deepEqual(await loadWriting(), snapshot);
		assert.deepEqual(await loadWriting(), snapshot);
		assert.equal(requests, 1);
		globalThis.fetch = async () => new Response("unavailable", { status: 503 });
		assert.deepEqual(await fetchRssPosts("https://metalops.dev/rss.xml"), []);
		globalThis.fetch = async () => new Response("<rss><channel /></rss>");
		assert.deepEqual(await fetchRssPosts("https://metalops.dev/rss.xml"), []);
	} finally {
		globalThis.fetch = original;
	}
});

test("live writing uses the latest valid canonical article", async () => {
	const original = globalThis.fetch;
	try {
		globalThis.fetch = async (_url, options) => {
			assert.ok(options?.signal, "feed requests have a timeout");
			return new Response(`<rss><channel>
        <item><title>Older</title><link>https://metalops.dev/blog/older/</link><description>Published article.</description><pubDate>2026-01-01</pubDate></item>
        <item><title>Latest</title><link>https://metalops.dev/blog/latest/</link><description>New published article.</description><pubDate>2026-10-15</pubDate></item>
        <item><title>Other site</title><link>https://example.org/post/</link><description>Not MetalOps.</description><pubDate>2027-01-01</pubDate></item>
        <item><title>Invalid</title><link>https://metalops.dev/blog/invalid/</link><description>No date.</description></item>
      </channel></rss>`);
		};
		const { loadWriting: loadLive } = await import(
			new URL("../src/utils/writing.ts?live", import.meta.url).href
		);
		const posts = await loadLive();
		assert.deepEqual(
			posts.map((post: { title: string }) => post.title),
			["Latest", "Older"],
		);
	} finally {
		globalThis.fetch = original;
	}
});
