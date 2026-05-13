import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';

interface MDXRendererProps {
  source: string;
}

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 text-text-primary" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-semibold mt-6 mb-3 text-text-primary" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-semibold mt-4 mb-2 text-text-primary" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-base leading-relaxed mb-4 text-text-secondary" {...props} />
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link href={href || '#'} className="text-accent hover:text-accent-light transition-colors" {...props}>
      {children}
    </Link>
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside mb-4 space-y-1 text-text-secondary" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside mb-4 space-y-1 text-text-secondary" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 bg-primary/5 rounded-r-lg italic text-text-secondary" {...props} />
  ),
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="bg-surface-lighter px-1.5 py-0.5 rounded text-sm font-mono text-primary-light" {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className={`block bg-[#0d0f1a] text-text-primary p-4 rounded-lg overflow-x-auto text-sm font-mono ${className || ''}`} {...props}>
        {children}
      </code>
    );
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="mb-4 rounded-lg overflow-hidden border border-border" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-4 rounded-lg border border-border">
      <table className="min-w-full" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="bg-surface-light px-4 py-2 text-left font-semibold text-text-primary text-sm" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-2 text-sm text-text-secondary border-t border-border" {...props} />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image src={(props.src as string) || ''} alt={String(props.alt || '')} width={800} height={450} className="rounded-xl my-4" />
  ),
  hr: () => <hr className="my-8 border-border" />,
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-text-primary" {...props} />
  ),
};

export default function MDXRenderer({ source }: MDXRendererProps) {
  return (
    <div className="prose-container max-w-3xl mx-auto">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
          },
        }}
      />
    </div>
  );
}
