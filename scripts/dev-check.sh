#!/bin/bash

# Development utility scripts for cyber-doom website maintenance

echo "🚀 Cyber-Doom Development Utilities"
echo "=================================="

# Function to run linting
lint_check() {
    echo "🔍 Running lint checks..."
    npm run lint
    if [ $? -eq 0 ]; then
        echo "✅ Linting passed!"
    else
        echo "❌ Linting failed. Please fix errors above."
        exit 1
    fi
}

# Function to run type checking
type_check() {
    echo "🔧 Running TypeScript checks..."
    npm run type-check || npx tsc --noEmit
    if [ $? -eq 0 ]; then
        echo "✅ Type checking passed!"
    else
        echo "❌ Type checking failed. Please fix errors above."
        exit 1
    fi
}

# Function to validate content
validate_content() {
    echo "📝 Validating MDX content..."

    # Check if now page exists
    if [ -f "data/now/now.mdx" ]; then
        echo "✅ Now page found"
    else
        echo "⚠️  Now page not found at data/now/now.mdx"
    fi

    # Check for required frontmatter
    if grep -q "title:" data/now/now.mdx 2>/dev/null; then
        echo "✅ Now page has title"
    else
        echo "❌ Now page missing title in frontmatter"
    fi

    if grep -q "lastUpdated:" data/now/now.mdx 2>/dev/null; then
        echo "✅ Now page has lastUpdated"
    else
        echo "❌ Now page missing lastUpdated in frontmatter"
    fi
}

# Function to build and test
build_test() {
    echo "🏗️  Building project..."
    npm run build
    if [ $? -eq 0 ]; then
        echo "✅ Build successful!"
    else
        echo "❌ Build failed. Please fix errors above."
        exit 1
    fi
}

# Function to check cyber-doom theme consistency
theme_check() {
    echo "🎨 Checking cyber-doom theme consistency..."

    # Check for consistent color usage
    echo "Checking color consistency..."
    color_count=$(find . -name "*.tsx" -o -name "*.ts" -o -name "*.css" | xargs grep -o "#ff3860\|#00ff99\|orange-400" | wc -l)
    echo "Found $color_count cyber-doom color references"

    # Check for ▲ symbol usage
    echo "Checking symbol consistency..."
    symbol_count=$(find . -name "*.tsx" -o -name "*.ts" | xargs grep -o "▲" | wc -l)
    echo "Found $symbol_count ▲ symbol references"

    echo "✅ Theme check complete!"
}

# Main menu
case "$1" in
    "lint")
        lint_check
        ;;
    "types")
        type_check
        ;;
    "content")
        validate_content
        ;;
    "build")
        build_test
        ;;
    "theme")
        theme_check
        ;;
    "all")
        lint_check
        type_check
        validate_content
        theme_check
        build_test
        echo "🎉 All checks passed! Cyber-doom website is ready!"
        ;;
    *)
        echo "Usage: $0 {lint|types|content|build|theme|all}"
        echo ""
        echo "Commands:"
        echo "  lint     - Run ESLint checks"
        echo "  types    - Run TypeScript checks"
        echo "  content  - Validate MDX content"
        echo "  build    - Build and test project"
        echo "  theme    - Check theme consistency"
        echo "  all      - Run all checks"
        exit 1
        ;;
esac