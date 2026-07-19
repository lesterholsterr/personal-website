import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // 301s from the legacy static site's URLs (see old_website/sitemap.txt) to the
  // new App Router paths, so Google transfers the old pages' ranking authority.
  // Order matters: specific index pages must come before the :slug wildcards.
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/Blog/blog.html', destination: '/blog', permanent: true },
      {
        source: '/Bookshelf/bookshelf.html',
        destination: '/bookshelf',
        permanent: true,
      },
      {
        source: '/Blog/:slug.html',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/Bookshelf/:slug.html',
        destination: '/bookshelf/:slug',
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
});

export default withMDX(nextConfig);
