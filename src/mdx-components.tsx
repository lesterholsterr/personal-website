import type { MDXComponents } from 'mdx/types';

// Export the components directly for use with next-mdx-remote
export const mdxComponents: MDXComponents = {
    h1: ({ children }) => (
      <h1 className="text-4xl font-light text-gray-900 dark:text-gray-100 mb-8 mt-16">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-light text-gray-900 dark:text-gray-100 mb-6 mt-12">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4 mt-10">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-lg leading-loose text-gray-700 dark:text-gray-300 mb-12">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-6 pr-6 pt-4 pb-4 my-12 italic text-lg leading-loose text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-justify [&>p]:mb-0">
        {children}
      </blockquote>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-12 space-y-4 text-lg leading-loose text-gray-700 dark:text-gray-300">
        {children}
      </ol>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-12 space-y-4 text-lg leading-loose text-gray-700 dark:text-gray-300">
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li className="ml-4">{children}</li>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-gray-600 dark:text-gray-400 underline decoration-gray-400 dark:decoration-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:decoration-gray-600 dark:hover:decoration-gray-300 transition-colors duration-200"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-12 text-sm">
        {children}
      </pre>
    ),
    hr: () => (
      <hr className="my-16 border-t border-gray-300 dark:border-gray-600" />
    ),
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}