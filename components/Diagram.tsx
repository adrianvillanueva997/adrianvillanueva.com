"use client";
import { useTheme } from 'next-themes';

export default function Diagram({ name }: { name: string }) {
    const { theme } = useTheme()
    const suffix = theme === 'dark' ? 'dark' : 'light'
    return (
        <img src={`/static/diagrams/${name}-${suffix}.svg`} alt={name} />
    )
}