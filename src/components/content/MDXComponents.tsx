import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MDXComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700 dark:text-gray-300" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-base leading-relaxed mb-4 text-gray-600 dark:text-gray-400" {...props} />
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link
      href={href || '#'}
      className="text-blue-600 dark:text-blue-400 hover:underline"
      {...props}
    >
      {children}
    </Link>
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-400" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-400" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-base" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-yellow-500 pl-4 py-2 my-4 bg-yellow-50 dark:bg-yellow-900/20 italic text-gray-600 dark:text-gray-400" {...props} />
  ),
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-red-600 dark:text-red-400" {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className={`block bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono ${className || ''}`} {...props}>
        {children}
      </code>
    );
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="mb-4 rounded-lg overflow-hidden" {...props} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border border-gray-200 dark:border-gray-700 text-left font-semibold text-gray-700 dark:text-gray-300" {...props} />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400" {...props} />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      src={(props.src as string) || ''}
      alt={String(props.alt || '')}
      width={800}
      height={450}
      className="rounded-lg my-4"
    />
  ),
  hr: () => <hr className="my-8 border-gray-200 dark:border-gray-700" />,
};

export default MDXComponents;
