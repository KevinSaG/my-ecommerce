# Quick Setup Guide

## 1. Install Dependencies

Dependencies are already installed, but if you need to reinstall:
```bash
npm install
```

## 2. Configure Supabase

1. **Create a Supabase account** at [supabase.com](https://supabase.com) (free tier available)

2. **Create a new project** in the Supabase dashboard

3. **Copy your project credentials**:
   - Go to Project Settings > API
   - Copy the Project URL (looks like: `https://xxxxx.supabase.co`)
   - Copy the `anon` public key

4. **Create your environment file**:
   ```bash
   # Copy the example file
   cp .env.local.example .env.local
   ```

5. **Edit `.env.local`** and add your credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

## 4. Create Your First Database Table (Optional)

In the Supabase dashboard, go to the SQL Editor and run:

```sql
-- Create a products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  stock INTEGER DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to read products
CREATE POLICY "Public products are viewable by everyone"
ON products FOR SELECT
TO public
USING (true);

-- Insert some sample data
INSERT INTO products (name, description, price, stock) VALUES
  ('Premium Wireless Headphones', 'High-quality wireless headphones with noise cancellation', 299.99, 50),
  ('Smart Watch Pro', 'Advanced fitness tracking and health monitoring', 399.99, 30),
  ('Laptop Stand', 'Ergonomic aluminum laptop stand', 49.99, 100);
```

## 5. Fetch Data from Supabase (Example)

Update `app/products/page.tsx` to fetch real data:

```typescript
import { createClient } from '@/lib/supabase/server';

export default async function ProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from('products')
    .select('*');

  // ... rest of component
}
```

## Project Structure

```
my-ecommerce/
├── app/                      # Next.js App Router
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── products/
│       └── page.tsx         # Products page
├── components/               # Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
├── lib/
│   └── supabase/            # Supabase utilities
│       ├── client.ts        # Browser client
│       ├── server.ts        # Server client
│       └── middleware.ts    # Middleware helper
├── middleware.ts            # Next.js middleware
├── .env.local.example       # Environment template
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Next Steps

1. ✅ Set up Supabase environment variables
2. ✅ Run `npm run dev`
3. 🔲 Create your database schema in Supabase
4. 🔲 Set up authentication (optional)
5. 🔲 Build your features!

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## Troubleshooting

**Build errors?** Make sure all dependencies are installed:
```bash
npm install
```

**Supabase connection issues?** Double-check your `.env.local` file contains the correct credentials.

**Port already in use?** Run on a different port:
```bash
npm run dev -- -p 3001
```

