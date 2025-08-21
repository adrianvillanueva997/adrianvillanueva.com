"use client";


interface DiagramProps {
    name: string;
    alt?: string;
    className?: string;
}

export default function Diagram({ name, alt, className }: DiagramProps) {
    return (
        <img
            src={`/static/diagrams/${name}.svg`}
            alt={alt ?? name}
            className={className}
            loading="lazy"
        />
    );
}