# MDX Components Documentation

This document describes all the enhanced and new MDX components available for your doom metal/synthwave themed blog.

## Enhanced Existing Components

### TableWrapper

Enhanced table wrapper with doom aesthetic styling.

```tsx
<TableWrapper title="Performance Metrics">
  <table>
    <thead>
      <tr><th>Metric</th><th>Value</th></tr>
    </thead>
    <tbody>
      <tr><td>Speed</td><td>99ms</td></tr>
    </tbody>
  </table>
</TableWrapper>
```

### Comments

Enhanced comment loading component with doom styling.

### ScrollTopAndComment

Floating action buttons with doom colors and hover effects.

### Footer

Enhanced footer with consistent doom theming and animated elements.

### MobileNav

Full-screen mobile navigation with doom aesthetic and backdrop blur.

## New MDX Components

### Alert

Display important information with different severity levels.

```tsx
<Alert type="error" title="Critical Error" dismissible>
  This is an error message with doom styling.
</Alert>

<Alert type="success" title="Success">
  Operation completed successfully!
</Alert>

<Alert type="warning" title="Warning">
  Please be careful with this operation.
</Alert>

<Alert type="info">
  This is some informational content.
</Alert>
```

**Props:**

- `type`: "info" | "success" | "warning" | "error"
- `title?`: Optional title text
- `dismissible?`: Whether the alert can be dismissed (default: false)

### Badge & BadgeGroup

Display tags or status indicators.

```tsx
<BadgeGroup
  title="Technologies Used"
  badges={["React", "TypeScript", "Tailwind", "Next.js"]}
  variant="success"
/>

<Badge variant="error" size="lg">Critical</Badge>
```

**BadgeGroup Props:**

- `badges`: Array of badge labels
- `variant?`: "default" | "success" | "error" | "warning" | "info"
- `title?`: Optional group title

**Badge Props:**

- `variant?`: "default" | "success" | "error" | "warning" | "info"
- `size?`: "sm" | "md" | "lg"

### CodeBlock

Enhanced code display with syntax highlighting and copy functionality.

```tsx
<CodeBlock
  language="typescript"
  filename="example.ts"
  copyable={true}
  showLineNumbers={true}
>
  const hello = "world";
  console.log(hello);
</CodeBlock>
```

**Props:**

- `language?`: Programming language (default: "bash")
- `filename?`: Optional filename display
- `copyable?`: Enable copy button (default: true)
- `showLineNumbers?`: Show line numbers (default: true)

### ImageComparison

Side-by-side image comparison with before/after styling.

```tsx
<ImageComparison
  title="Performance Optimization"
  beforeSrc="/images/before.png"
  afterSrc="/images/after.png"
  beforeAlt="Before optimization"
  afterAlt="After optimization"
/>
```

**Props:**

- `beforeSrc`: Path to before image
- `afterSrc`: Path to after image
- `beforeAlt`: Alt text for before image
- `afterAlt`: Alt text for after image
- `title?`: Optional comparison title

### ProgressBar

Animated progress indicators with doom styling.

```tsx
<ProgressBar
  value={75}
  max={100}
  label="Project Progress"
  color="green"
  animated={true}
  showPercentage={true}
/>
```

**Props:**

- `value`: Current progress value
- `max?`: Maximum value (default: 100)
- `label?`: Progress label
- `color?`: "red" | "green" | "blue" | "yellow" (default: "green")
- `showPercentage?`: Show percentage (default: true)
- `animated?`: Enable animations (default: true)

### Quote

Stylized blockquotes with author attribution.

```tsx
<Quote
  author="Linus Torvalds"
  source="Linux Creator"
  type="success"
>
  Talk is cheap. Show me the code.
</Quote>

<Quote type="warning">
  This approach might cause performance issues.
</Quote>
```

**Props:**

- `author?`: Quote author
- `source?`: Quote source/context
- `type?`: "default" | "warning" | "success" | "error"

### StatsGrid

Display key metrics in a grid layout.

```tsx
<StatsGrid
  title="Project Statistics"
  columns={3}
  stats={[
    {
      title: "Total Users",
      value: "1,337",
      subtitle: "Active monthly users",
      color: "green",
      trend: { direction: "up", value: "+12%" }
    },
    {
      title: "Response Time",
      value: "42ms",
      color: "blue",
      trend: { direction: "down", value: "-8ms" }
    }
  ]}
/>
```

**Props:**

- `title?`: Grid title
- `columns?`: 1 | 2 | 3 | 4 (default: 3)
- `stats`: Array of stat objects with:
  - `title`: Stat label
  - `value`: Stat value (string or number)
  - `subtitle?`: Additional description
  - `color?`: "red" | "green" | "blue" | "yellow"
  - `trend?`: Trend information with direction and value

### Tabs

Organize content in tabbed interface.

```tsx
<Tabs
  defaultTab="overview"
  items={[
    {
      id: "overview",
      title: "Overview",
      content: <div>Overview content here</div>
    },
    {
      id: "details",
      title: "Details",
      content: <div>Detailed information</div>
    }
  ]}
/>
```

**Props:**

- `items`: Array of tab objects with id, title, and content
- `defaultTab?`: ID of the default active tab

### Timeline

Display chronological events or project milestones.

```tsx
<Timeline
  title="Project Roadmap"
  items={[
    {
      title: "Project Kickoff",
      date: "Q1 2024",
      description: "Initial planning and setup phase",
      status: "completed"
    },
    {
      title: "Development Phase",
      date: "Q2 2024",
      description: "Core feature development",
      status: "current"
    },
    {
      title: "Launch",
      date: "Q3 2024",
      description: "Public release",
      status: "upcoming"
    }
  ]}
/>
```

**Props:**

- `title?`: Timeline title
- `items`: Array of timeline items with:
  - `title`: Event title
  - `date`: Event date/period
  - `description?`: Event description
  - `status?`: "completed" | "current" | "upcoming"

## Design System

All components follow the doom metal/synthwave design principles:

### Colors

- **Primary Red**: `#ff3860` - Used for destructive actions, errors, highlights
- **Primary Green**: `#00ff99` - Used for success states, active elements, accents
- **Background**: Dark grays (`gray-950`, `gray-900`, `gray-800`)
- **Text**: Light grays and whites for readability
- **Borders**: Subtle gray borders with colored accents

### Typography

- **Headers**: `font-gothic` for dramatic effect
- **Code/Monospace**: `font-mono` for technical content
- **Body**: Default sans-serif with good readability

### Effects

- Subtle glow effects on hover (`hover:shadow-lg hover:shadow-[color]/20`)
- Smooth transitions (`transition-all duration-300`)
- Scale transforms on hover (`hover:scale-105`)
- Gradient overlays for depth
- Terminal-style aesthetics where appropriate

### Usage Examples in Blog Posts

```mdx
# My Blog Post

<Alert type="info" title="Note">
This post covers advanced topics in system design.
</Alert>

## Performance Results

<StatsGrid
  title="Benchmark Results"
  stats={[
    { title: "Throughput", value: "10k/sec", color: "green" },
    { title: "Latency", value: "5ms", color: "blue" }
  ]}
/>

<ProgressBar value={85} label="Implementation Progress" />

## Timeline

<Timeline items={[
  { title: "Analysis", date: "Week 1", status: "completed" },
  { title: "Implementation", date: "Week 2-3", status: "current" }
]} />

<Quote author="Donald Knuth" type="success">
Premature optimization is the root of all evil.
</Quote>

<CodeBlock language="typescript" filename="optimization.ts">
const optimize = (data: Data[]): OptimizedData[] => {
  return data.filter(item => item.isValid)
    .map(item => transform(item));
};
</CodeBlock>
```

All components are designed to work seamlessly together and maintain the doom/synthwave aesthetic throughout your blog.
