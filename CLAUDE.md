# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack for faster builds)
- **Build**: `npm run build` 
- **Production server**: `npm start`
- **Linting**: `npm run lint`

## Project Architecture

This is a Next.js 15 application using the App Router architecture with the following key characteristics:

- **Framework**: Next.js 15.3.2 with React 19
- **Styling**: Tailwind CSS v4 with PostCSS
- **TypeScript**: Configured with strict mode and Next.js plugin
- **Font Management**: Uses Geist Sans and Geist Mono fonts via `next/font/google`
- **Project Structure**: 
  - `src/app/` - App Router pages and layouts
  - `public/` - Static assets
  - `old_website/` - Legacy static HTML/CSS/JS website (not part of Next.js app)

## Key Configuration

- TypeScript path alias: `@/*` maps to `./src/*`
- Dark mode support built into CSS with `prefers-color-scheme`
- ESLint configured with Next.js recommended rules
- CSS uses Tailwind's new inline theming approach (`@theme inline`)

## Architecture Notes

The project contains both a new Next.js application and an old static website in the `old_website/` directory. The old website appears to be a personal portfolio with blog posts, bookshelf, and gallery sections. When working on new features, focus on the Next.js app in `src/` unless specifically asked to work with the legacy content.