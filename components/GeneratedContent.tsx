import React from 'react';
import { StyleResponse, StyledItem } from '../types';

interface GeneratedContentProps {
  content: string;
  title?: string;
  lite?: boolean;
}

// A robust helper to process inline markdown (bold, links)
const parseInlineMarkdown = (line: string): string => {
    return line
        // [text](url) - for links
        .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-emerald-600 hover:text-emerald-800 underline">$1</a>')
        // **text** - for bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
};

const formatContent = (text: string): React.ReactNode[] => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];

    const flushList = () => {
        if (listItems.length > 0) {
            elements.push(
                <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-2 my-4">
                    {listItems.map((item, index) => (
                        <li key={`li-${index}`} dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(item) }} />
                    ))}
                </ul>
            );
            listItems = [];
        }
    };

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        // Regex for list items (handles '*' or '-')
        if (trimmedLine.match(/^(\*|-)\s/)) {
            listItems.push(trimmedLine.substring(2));
        } else {
            flushList();
            if (trimmedLine.startsWith('### ')) {
                elements.push(<h3 key={index} className="text-xl font-semibold mt-6 mb-2" dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(trimmedLine.substring(4)) }} />);
            } else if (trimmedLine.startsWith('## ')) {
                elements.push(<h2 key={index} className="text-2xl font-bold mt-8 mb-3" dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(trimmedLine.substring(3)) }} />);
            } else if (trimmedLine.startsWith('# ')) {
                elements.push(<h1 key={index} className="text-3xl font-bold mt-10 mb-4" dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(trimmedLine.substring(2)) }} />);
            } else if (trimmedLine.length > 0) {
                elements.push(<p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(trimmedLine) }}></p>);
            }
        }
    });

    flushList(); // Add any remaining list items
    return elements;
};

const renderStyledItems = (items: StyledItem[], title: string) => {
    if (!items || items.length === 0) return null;
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b border-emerald-200 pb-2 mb-4">{title}</h2>
            <div className="space-y-6">
                {items.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h3 className="text-xl font-semibold text-emerald-700">{item.itemName}</h3>
                        <p className="mt-1 text-gray-700">{item.description}</p>
                        <p className="mt-2 text-sm italic text-gray-500"><strong>Styling Tip:</strong> {item.stylingTip}</p>
                        {item.links && item.links.length > 0 && (
                            <div className="mt-3">
                                <h4 className="font-semibold text-gray-600 text-sm">Shop the Look:</h4>
                                <ul className="list-disc list-inside mt-1 space-y-1">
                                    {item.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800 underline">
                                                {link.productName}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


const tryRenderStructuredContent = (content: string): React.ReactNode | null => {
    try {
        const parsed: StyleResponse = JSON.parse(content);
        if ((parsed.sustainableItems && Array.isArray(parsed.sustainableItems)) || (parsed.otherItems && Array.isArray(parsed.otherItems))) {
            return (
                <div>
                    {renderStyledItems(parsed.sustainableItems, "Sustainable Items")}
                    {renderStyledItems(parsed.otherItems, "Other Items")}
                </div>
            );
        }
        return null;
    } catch (e) {
        return null;
    }
};


export const GeneratedContent: React.FC<GeneratedContentProps> = ({ content, title, lite = false }) => {
  const structuredContent = tryRenderStructuredContent(content);
    
  if (structuredContent) {
       if (lite) return <>{structuredContent}</>;
       return <div className="max-w-none break-words">{structuredContent}</div>;
  }
  
  // Fallback to markdown rendering
  const formattedJsx = formatContent(content);

  if (lite) {
    return <>{formattedJsx}</>;
  }

  return (
    <div className="prose prose-emerald max-w-none bg-white p-6 rounded-lg shadow mt-6 break-words">
       {title && <h2 className="text-2xl font-bold mb-4 !mt-0 text-gray-800">{title}</h2>}
       {formattedJsx}
    </div>
  );
};
