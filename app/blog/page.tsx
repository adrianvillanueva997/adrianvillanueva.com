import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={posts}
      title="All Posts"
      description="Sometimes I write interesting stuff"
      showSimplifiedView={true}
      pagination={undefined}
    />
  )
}
