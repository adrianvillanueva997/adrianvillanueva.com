'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

// Dynamically import the ForceGraph component with no SSR
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false })

type GraphData = {
  nodes: Array<{
    id: string
    name: string
    val: number
    color: string
  }>
  links: Array<{
    source: string
    target: string
    value: number
  }>
}

interface TagGraphProps {
  posts: any[]
}

export default function TagGraph({ posts }: TagGraphProps) {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] })
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 })
  const graphRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!posts || posts.length === 0) {
      setIsLoading(false)
      return
    }

    try {
      // Build the graph data from posts and their tags
      const tagsMap = new Map()
      const relationships = new Map()

      // Count occurrences of each tag
      posts.forEach(post => {
        if (!post.tags || !Array.isArray(post.tags)) return

        const postTags = post.tags

        // Add tags to map or increment count
        postTags.forEach(tag => {
          if (!tag) return // Skip null/undefined tags

          if (tagsMap.has(tag)) {
            tagsMap.set(tag, tagsMap.get(tag) + 1)
          } else {
            tagsMap.set(tag, 1)
          }

          // Create relationships between tags
          postTags.forEach(otherTag => {
            if (!otherTag || tag === otherTag) return // Skip self-relationships

            const relationKey = [tag, otherTag].sort().join('-')
            if (relationships.has(relationKey)) {
              relationships.set(relationKey, relationships.get(relationKey) + 1)
            } else {
              relationships.set(relationKey, 1)
            }
          })
        })
      })

      // Generate tag colors
      function getTagColor(tag) {
        let hash = 0
        for (let i = 0; i < tag.length; i++) {
          hash = tag.charCodeAt(i) + ((hash << 5) - hash)
        }
        const hue = Math.abs(hash % 360)
        return `hsl(${hue}, 70%, 60%)`
      }

      // Create nodes for each tag
      const nodes = Array.from(tagsMap.entries()).map(([tag, count]) => ({
        id: tag,
        name: tag,
        val: Math.max(3, Math.sqrt(count) * 2), // Size based on count
        color: getTagColor(tag)
      }))

      // Get the set of all valid node IDs
      const nodeIds = new Set(nodes.map(node => node.id))

      // Create links between related tags - only if both nodes exist
      const links = Array.from(relationships.entries())
        .map(([key, strength]) => {
          const [source, target] = key.split('-')

          // Only create links between existing nodes
          if (nodeIds.has(source) && nodeIds.has(target)) {
            return {
              source,
              target,
              value: strength
            }
          }
          return null
        })
        .filter(Boolean) // Remove null entries
        .filter((link): link is { source: string, target: string, value: number } =>
          link !== null && typeof link === 'object' && 'value' in link && link.value > 1
        ) // Filter out weak connections with type guard
        .map(link => ({
          source: link.source,
          target: link.target,
          value: link.value
        }))

      setGraphData({ nodes, links })

      // Set size to match container
      if (graphRef.current) {
        setDimensions({
          width: graphRef.current.clientWidth,
          height: 500
        })
      }
    } catch (error) {
      console.error("Error generating knowledge graph:", error)
    } finally {
      setIsLoading(false)
    }

    // Handle window resize
    const handleResize = () => {
      if (graphRef.current) {
        setDimensions({
          width: graphRef.current.clientWidth,
          height: 500
        })
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [posts])

  const handleNodeClick = (node) => {
    window.location.href = `/tags/${node.id}`
  }

  // No data or still loading
  if (isLoading) {
    return (
      <div className="mt-8 mb-12" ref={graphRef}>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Tag Relationships</h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-center items-center h-[500px]">
            <p>Building knowledge graph...</p>
          </div>
        </div>
      </div>
    )
  }

  // No graph data
  if (!graphData.nodes.length) {
    return (
      <div className="mt-8 mb-12" ref={graphRef}>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Tag Relationships</h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-center items-center h-[300px]">
            <p>Not enough connected tags to generate a graph.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8 mb-12" ref={graphRef}>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Tag Relationships</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Explore how topics are connected in my writing. Larger nodes represent more frequent tags.
      </p>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <ForceGraph2D
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeLabel="name"
          nodeColor="color"
          nodeVal="val"
          linkWidth={link => Math.sqrt(link.value) * 1.2} // Thicker lines
          linkColor={() => 'rgba(100, 120, 180, 0.6)'} // More visible blue color with higher opacity
          linkDirectionalParticles={2} // Add particles that flow along the links
          linkDirectionalParticleWidth={2} // Size of particles
          linkDirectionalParticleSpeed={0.01} // Slow particle movement
          linkCurvature={0.15} // Slightly curved links
          onNodeClick={handleNodeClick}
          cooldownTicks={100}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;

            // Draw node circle
            ctx.beginPath();
            ctx.arc(node.x ?? 0, node.y ?? 0, node.val ?? 3, 0, 2 * Math.PI, false);
            ctx.fillStyle = node.color;
            ctx.fill();

            // Add node stroke/border to make it stand out from links
            ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
            ctx.lineWidth = 1.5 / globalScale;
            ctx.stroke();

            // Only show text labels if zoomed in enough
            if (globalScale >= 0.8) {
              const textWidth = ctx.measureText(label).width;
              const backgroundRectHeight = fontSize + 4;

              // Draw text background
              ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
              ctx.fillRect(
                (node.x ?? 0) - textWidth / 2 - 2,
                (node.y ?? 0) + (node.val ?? 3) + 2,
                textWidth + 4,
                backgroundRectHeight
              );

              // Draw text
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = '#000';
              ctx.fillText(
                label,
                node.x ?? 0,
                (node.y ?? 0) + (node.val ?? 3) + backgroundRectHeight / 2 + 2
              );
            }
          }}
        />
      </div>
    </div>
  )
}