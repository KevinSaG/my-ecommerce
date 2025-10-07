# My E-Commerce Store

A modern e-commerce application built with Next.js, Supabase, and Tailwind CSS.

## Features

- ⚡ **Next.js 15** - Latest Next.js with App Router and React Server Components
- 🗄️ **Supabase** - PostgreSQL database with built-in authentication
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📱 **Responsive Design** - Mobile-first approach
- 🔐 **Authentication** - Ready for Supabase Auth integration
- 🌙 **Dark Mode** - Built-in dark mode support

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account ([sign up for free](https://supabase.com))

### Installation

1. Clone this repository or use the existing folder

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase credentials:
     - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

   You can find these values in your Supabase project settings under API.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
my-ecommerce/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── lib/
│   └── supabase/          # Supabase client utilities
│       ├── client.ts      # Browser client
│       ├── server.ts      # Server client
│       └── middleware.ts  # Auth middleware helper
├── middleware.ts          # Next.js middleware
└── ...config files
```

## Supabase Setup

1. Create a new project on [Supabase](https://supabase.com)
2. Copy your project URL and anon key to `.env.local`
3. Use the Supabase dashboard to:
   - Create your database tables
   - Set up authentication providers
   - Configure storage buckets
   - Add Row Level Security (RLS) policies

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Deployment

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add your environment variables
4. Deploy!

Don't forget to add your production URL to your Supabase project's allowed redirect URLs.

## License

MIT

