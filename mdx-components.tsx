import type { MDXComponents } from 'mdx/types';

const components: MDXComponents = {
  h1: (props) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 text-text-primary" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-2xl font-semibold mt-6 mb-3 text-text-primary" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-xl font-semibold mt-4 mb-2 text-text-primary" {...props} />
  ),
  p: (props) => (
    <p className="text-base leading-relaxed mb-4 text-text-secondary" {...props} />
  ),
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      className="text-accent hover:text-accent-light transition-colors"
      {...props}
    >
      {children}
    </a>
  ),
  ul: (props) => (
    <ul className="list-disc list-inside mb-4 space-y-1 text-text-secondary" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal list-inside mb-4 space-y-1 text-text-secondary" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 bg-primary/5 rounded-r-lg italic text-text-secondary" {...props} />
  ),
  hr: () => <hr className="my-8 border-border" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
