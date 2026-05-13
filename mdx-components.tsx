import type { MDXComponents } from 'mdx/types';

const components: MDXComponents = {
  h1: (props) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700 dark:text-gray-300" {...props} />
  ),
  p: (props) => (
    <p className="text-base leading-relaxed mb-4 text-gray-600 dark:text-gray-400" {...props} />
  ),
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      className="text-blue-600 dark:text-blue-400 hover:underline"
      {...props}
    >
      {children}
    </a>
  ),
  ul: (props) => (
    <ul className="list-disc list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-400" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-600 dark:text-gray-400" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="border-l-4 border-yellow-500 pl-4 py-2 my-4 bg-yellow-50 dark:bg-yellow-900/20 italic text-gray-600 dark:text-gray-400" {...props} />
  ),
  hr: () => <hr className="my-8 border-gray-200 dark:border-gray-700" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
