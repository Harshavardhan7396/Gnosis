import { Fragment, type ReactNode } from 'react';

interface MarkdownPreviewProps {
  content: string;
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Match **bold**, *italic*, `code`, or [label](url)
  const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyIdx = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(<Fragment key={`t-${keyIdx++}`}>{text.slice(lastIndex, match.index)}</Fragment>);
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push(
        <strong key={`b-${keyIdx++}`} className="font-semibold text-on-surface">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      nodes.push(
        <em key={`i-${keyIdx++}`} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      nodes.push(
        <code
          key={`c-${keyIdx++}`}
          className="font-mono text-[12px] px-1.5 py-0.5 rounded bg-surface-container-low border border-outline-variant/35 text-primary"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('[')) {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (linkMatch) {
        const [, label, rawUrl] = linkMatch;
        const safeHref = /^https?:\/\//i.test(rawUrl.trim()) ? rawUrl.trim() : '#';
        nodes.push(
          <a
            key={`a-${keyIdx++}`}
            href={safeHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (safeHref === '#') e.preventDefault();
            }}
            className="text-primary underline underline-offset-2 hover:opacity-80"
          >
            {label}
          </a>
        );
      } else {
        nodes.push(<Fragment key={`f-${keyIdx++}`}>{token}</Fragment>);
      }
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(<Fragment key={`e-${keyIdx++}`}>{text.slice(lastIndex)}</Fragment>);
  }

  return nodes;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const blocks: ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    // Fenced code block
    if (trimmed.startsWith('```')) {
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i += 1;
      }
      i += 1;
      blocks.push(
        <pre
          key={`code-${i}`}
          className="rounded-lg bg-surface-container-low border border-outline-variant/35 p-3.5 overflow-x-auto font-mono text-xs text-on-surface leading-relaxed"
        >
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,})$/.test(trimmed)) {
      blocks.push(<hr key={`hr-${i}`} className="border-outline-variant/30 my-2" />);
      i += 1;
      continue;
    }

    // Headings
    const headingMatch = /^(#{1,3})\s+(.+)$/.exec(trimmed);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const title = headingMatch[2];
      if (level === 1) {
        blocks.push(
          <h1
            key={`h1-${i}`}
            className="text-2xl font-medium text-on-surface pb-2 border-b border-outline-variant/30"
          >
            {renderInline(title)}
          </h1>
        );
      } else if (level === 2) {
        blocks.push(
          <h2
            key={`h2-${i}`}
            className="text-xl font-medium text-on-surface pt-1 pb-1 border-b border-outline-variant/20"
          >
            {renderInline(title)}
          </h2>
        );
      } else {
        blocks.push(
          <h3 key={`h3-${i}`} className="text-base font-semibold text-on-surface pt-1">
            {renderInline(title)}
          </h3>
        );
      }
      i += 1;
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i += 1;
      }
      blocks.push(
        <blockquote
          key={`bq-${i}`}
          className="px-4 py-2.5 rounded-lg bg-surface-container-low/60 border border-outline-variant/35 text-sm text-on-surface-variant italic leading-relaxed"
        >
          {renderInline(quoteLines.join(' '))}
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
        i += 1;
      }
      blocks.push(
        <ul key={`ul-${i}`} className="list-disc pl-5 space-y-1.5 text-sm text-on-surface-variant">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i += 1;
      }
      blocks.push(
        <ol key={`ol-${i}`} className="list-decimal pl-5 space-y-1.5 text-sm text-on-surface-variant">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph (collect consecutive plain lines)
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(#{1,3}\s+|```|[-*]\s+|\d+\.\s+|>\s?|-{3,}$|\*{3,}$)/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i += 1;
    }
    blocks.push(
      <p key={`p-${i}`} className="text-sm text-on-surface-variant leading-relaxed">
        {renderInline(paraLines.join(' '))}
      </p>
    );
  }

  if (blocks.length === 0) {
    return (
      <p className="text-xs italic text-on-surface-variant/75">
        This Markdown file does not have any text yet.
      </p>
    );
  }

  return <div className="space-y-3.5">{blocks}</div>;
}
