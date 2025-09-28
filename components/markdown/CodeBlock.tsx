"use client";

import { useState } from "react";

interface CodeBlockProps {
    language?: string;
    filename?: string;
    children: string;
    showLineNumbers?: boolean;
}

export default function CodeBlock({
    language = "text",
    filename,
    children,
    showLineNumbers = false,
}: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    const lines = children.split("\n").filter(line => line.trim() !== "");

    return (
        <div className="my-6 border-4 border-black bg-white overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-black border-b-4 border-black">
                <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 border-2 border-white bg-red-500" />
                        <div className="w-3 h-3 border-2 border-white bg-yellow-400" />
                        <div className="w-3 h-3 border-2 border-white bg-green-500" />
                    </div>
                    <div className="font-mono text-white font-black uppercase text-sm">
                        {filename ? (
                            <span>{filename} ({language})</span>
                        ) : (
                            <span>{language}</span>
                        )}
                    </div>
                </div>
                <button
                    type="button"
                    onClick={copyToClipboard}
                    className="px-3 py-1 font-mono text-xs font-black text-white bg-gray-800 border-2 border-white hover:bg-white hover:text-black transition-colors uppercase"
                >
                    {copied ? "COPIED!" : "COPY"}
                </button>
            </div>

            {/* Code Content */}
            <div className="relative bg-gray-50">
                <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed">
                    <code className="text-black">
                        {showLineNumbers ? (
                            <table className="w-full">
                                <tbody>
                                    {lines.map((line, index) => (
                                        <tr key={`line-${line.substring(0, 20)}-${index}`}>
                                            <td className="pr-4 text-black text-right select-none border-r-4 border-black font-black">
                                                {index + 1}
                                            </td>
                                            <td className="pl-4">
                                                {line}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            children
                        )}
                    </code>
                </pre>
            </div>
        </div>
    );
}