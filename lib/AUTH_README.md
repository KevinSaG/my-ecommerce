# Adelca Authentication System

## 🔐 Overview

This e-commerce platform uses **Supabase Auth** integrated with custom user tables for role-based access control and customer management.

## 🏗️ Architecture

### Auth Integration

```
┌─────────────────┐
│  auth.users     │ ← Supabase Auth (Built-in)
│  (Supabase)     │
└────────┬────────┘
         │
         │ (FK: id → id)
         │
┌────────▼────────┐
│  users          │ ← Custom user data
│  (Public)       │   (role, phone, etc.)
└────────┬────────┘
         │
         │ (FK: id → user_id)
         │
┌────────▼────────┐
│  user_profiles  │ ← Extended profile
│  (Public)       │   (company, credit, etc.)
└─────────────────┘
```

## 👤 Default Admin User

**Email:** `admin@admin.com`  
**Password:** `admin123`  
**Role:** `admin`  
**Name:** Admin Adelca

⚠️ **Important:** Change this password in production!

## 🚀 Usage Examples

### Client Component (React)

```typescript
'use client';

import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Login failed:', error);
    } else {
      console.log('Logged in:', data.user);
      // Redirect to dashboard
      window.location.href = '/dashboard';
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Server Component (Next.js)

```typescript
import { createClient } from '@/lib/supabase/server';
import { getCurrentUser } from '@/lib/auth-helpers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { user, profile } = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  return (
    <div>
      <h1>Welcome, {profile?.first_name}!</h1>
      <p>Role: {user.role}</p>
      <p>Customer Type: {profile?.customer_type}</p>
      {profile?.credit_limit && (
        <p>Available Credit: ${(profile.credit_limit - (profile.credit_used || 0)).toFixed(2)}</p>
      )}
    </div>
  );
}
```

### Sign Up New User

```typescript
import { signUp } from '@/lib/auth-helpers';

async function handleSignUp() {
  const { user, error } = await signUp({
    email: 'nuevo@empresa.com',
    password: 'SecurePass123!',
    firstName: 'Juan',
    lastName: 'Pérez',
    companyName: 'Constructora ABC',
    taxId: '1234567890001', // RUC
    customerType: 'construction',
    phone: '0991234567'
  });
  
  if (error) {
    console.error('Sign up failed:', error);
  } else {
    console.log('User created:', user);
  }
}
```

### Check User Role (Server)

```typescript
import { hasRole, isAdmin } from '@/lib/auth-helpers';

export default async function AdminPage() {
  const admin = await isAdmin();
  
  if (!admin) {
    return <div>Access Denied</div>;
  }
  
  return <div>Admin Panel</div>;
}
```

### Protect API Routes

```typescript
// app/api/admin/route.ts
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Get user role
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();
    
  if (userData?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  
  // Admin logic here
  return NextResponse.json({ message: 'Admin access granted' });
}
```

## 🔑 User Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| `admin` | System administrator | Full access to all features |
| `sales_rep` | Sales representative | Manage quotes, view all orders |
| `customer` | Regular customer | Place orders, view own data |
| `distributor` | Authorized distributor | Special pricing, bulk orders |
| `guest` | Anonymous user | Browse products only |

## 👥 Customer Types

| Type | Description | Default Discount |
|------|-------------|------------------|
| `retail` | Retail customer | 0% |
| `wholesale` | Wholesale buyer | 5% |
| `construction` | Construction company | 10% |
| `hardware_store` | Hardware store | 8% |
| `industrial` | Industrial client | 12% |
| `government` | Government entity | 0% |

## 🔒 Row Level Security (RLS)

### Users Table

```sql
-- Users can view their own profile
CREATE POLICY "Users can view own profile" 
  ON users FOR SELECT 
  USING (auth.uid() = id);

-- Admins can view all users
CREATE POLICY "Admins can view all users" 
  ON users FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'sales_rep')
  ));
```

### Orders Table

```sql
-- Users can view own orders, admins can view all
CREATE POLICY "Users can view own orders" 
  ON orders FOR SELECT 
  USING (
    auth.uid() = user_id 
    OR EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'sales_rep')
    )
  );
```

## 🔄 Auto User Creation

When a user signs up through Supabase Auth, the following happens automatically:

1. **Auth User Created** - Record in `auth.users`
2. **Trigger Fires** - `on_auth_user_created` trigger executes
3. **User Record Created** - Entry in `users` table
4. **Profile Created** - Entry in `user_profiles` table

```sql
-- This happens automatically via trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

## 🛡️ Security Best Practices

### 1. Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Password Requirements

Implement strong password requirements:
- Minimum 8 characters
- At least one uppercase letter
- At least one number
- At least one special character

### 3. Email Verification

Enable email verification in Supabase dashboard:
- Go to Authentication → Providers → Email
- Enable "Confirm email"

### 4. Rate Limiting

Supabase provides built-in rate limiting. Configure in dashboard:
- Authentication → Rate Limits
- Set appropriate limits for sign up / sign in

## 📝 Common Queries

### Get All Customers

```typescript
const supabase = await createClient();

const { data: customers } = await supabase
  .from('users')
  .select(`
    *,
    profile:user_profiles(*)
  `)
  .eq('role', 'customer')
  .order('created_at', { ascending: false });
```

### Get Users by Customer Type

```typescript
const { data: constructionClients } = await supabase
  .from('user_profiles')
  .select(`
    *,
    user:users(email, role)
  `)
  .eq('customer_type', 'construction');
```

### Update User Role (Admin Only)

```typescript
// Only admins should be able to do this
const { error } = await supabase
  .from('users')
  .update({ role: 'sales_rep' })
  .eq('id', userId);
```

### Grant Credit to Customer

```typescript
const { error } = await supabase
  .from('user_profiles')
  .update({ 
    credit_limit: 5000.00,
    discount_percentage: 10
  })
  .eq('user_id', customerId);
```

## 🔧 Admin Functions

### Create Admin User (SQL)

```sql
SELECT create_admin_user(
  'neweadmin@adelca.com',
  'SecurePassword123!',
  'Admin',
  'Name'
);
```

### Promote User to Admin

```sql
UPDATE users 
SET role = 'admin' 
WHERE email = 'user@example.com';
```

### View All Admins

```sql
SELECT 
  u.email,
  u.role,
  up.first_name,
  up.last_name,
  u.created_at
FROM users u
LEFT JOIN user_profiles up ON u.id = up.user_id
WHERE u.role IN ('admin', 'sales_rep')
ORDER BY u.created_at DESC;
```

## 🐛 Troubleshooting

### Issue: User can't log in

1. Check email is verified
2. Verify password is correct
3. Check if user is active: `SELECT is_active FROM users WHERE email = '...'`
4. Check Supabase Auth logs in dashboard

### Issue: RLS blocking queries

1. Ensure user is authenticated
2. Check RLS policies match your use case
3. Use `.rpc()` for complex queries that need SECURITY DEFINER

### Issue: Profile not created automatically

1. Check trigger is enabled: `\dft` in SQL editor
2. Verify `handle_new_user()` function exists
3. Check Supabase logs for errors

## 📚 Additional Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Next.js Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## 🔐 Production Checklist

- [ ] Change default admin password
- [ ] Enable email verification
- [ ] Configure rate limiting
- [ ] Set up password requirements
- [ ] Enable 2FA for admins
- [ ] Review and test all RLS policies
- [ ] Set up auth webhooks for logging
- [ ] Configure email templates
- [ ] Set up SMTP for emails
- [ ] Test password reset flow

