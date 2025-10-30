# MCOM Mall

A modern e-commerce application built with Next.js 16, React 19, and Tailwind CSS v4.

## Features

- User authentication (Sign up/Sign in)
- Product search and browsing
- Responsive design with dark mode support
- Modern UI with shadcn/ui components

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **State Management:** TanStack Query (React Query)
- **Form Handling:** React Hook Form + Zod
- **UI Components:** Radix UI + shadcn/ui
- **HTTP Client:** Axios

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository or download the ZIP file

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` and add your API URL (default is already set).

4. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
├── app/                  # Next.js app directory
│   ├── page.tsx         # Home page
│   ├── search/          # Search page
│   ├── signin/          # Sign in page
│   ├── signup/          # Sign up page
│   └── layout.tsx       # Root layout
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── providers.tsx   # App providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── types/              # TypeScript types
\`\`\`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | Yes |

## Troubleshooting

### Styles not loading

If Tailwind styles aren't loading, ensure:
1. `postcss.config.mjs` exists with `@tailwindcss/postcss` plugin
2. `app/globals.css` has `@import "tailwindcss"`
3. Clear `.next` folder and restart dev server

### Build errors

If you encounter TypeScript errors during build:
1. Run `npm run lint` to check for issues
2. Ensure all dependencies are installed
3. Delete `node_modules` and `.next`, then reinstall

## License

This project is private and proprietary.
