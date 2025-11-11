# Deployment Guide

## Vercel Deployment

### Prerequisites
1. A [Vercel account](https://vercel.com/signup)
2. A [Supabase account](https://supabase.com) with a project created
3. GitHub repository connected to Vercel

### Steps to Deploy

1. **Set up Supabase**
   - Create a new project in Supabase
   - Go to Project Settings > API
   - Copy your `Project URL` and `anon/public key`

2. **Configure Database**
   - In Supabase, go to the SQL Editor
   - Run the Prisma migrations or set up tables manually
   - Alternatively, use the Prisma CLI:
     ```bash
     npx prisma migrate deploy
     ```

3. **Deploy to Vercel**
   
   **Option 1: Via Vercel Dashboard**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Configure environment variables (see below)
   - Click Deploy

   **Option 2: Via Vercel CLI**
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

4. **Environment Variables**
   
   Add these in Vercel Dashboard > Settings > Environment Variables:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   DATABASE_URL=postgresql://user:password@host:5432/database
   ```

   **Where to find these:**
   - `NEXT_PUBLIC_SUPABASE_URL`: Supabase Dashboard > Settings > API > Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase Dashboard > Settings > API > anon public
   - `DATABASE_URL`: Supabase Dashboard > Settings > Database > Connection string (URI)

5. **Redeploy**
   - After adding environment variables, trigger a new deployment
   - Vercel will automatically redeploy on future git pushes

### Post-Deployment

1. **Test Authentication**
   - Visit your deployed URL
   - Try signing up and logging in
   - Verify email confirmation works (configure in Supabase)

2. **Configure Supabase Authentication**
   - In Supabase Dashboard > Authentication > URL Configuration
   - Add your Vercel deployment URL to "Site URL"
   - Add redirect URLs for authentication callbacks

3. **Set up Custom Domain** (Optional)
   - Go to Vercel Dashboard > Settings > Domains
   - Add your custom domain
   - Update Supabase URL configuration accordingly

### Database Migrations

To run Prisma migrations in production:

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy
```

Or use Vercel's build command to run migrations automatically:
- Set build command in `package.json`:
  ```json
  "scripts": {
    "build": "prisma generate && next build"
  }
  ```

### Troubleshooting

**Build Errors:**
- Ensure all environment variables are set
- Check build logs in Vercel Dashboard
- Verify Node.js version compatibility (18.x or higher)

**Authentication Issues:**
- Verify Supabase URL and keys are correct
- Check Supabase URL configuration for redirects
- Ensure email confirmation is properly configured

**Database Connection:**
- Verify DATABASE_URL is correct
- Check if connection pooling is needed for serverless
- Consider using Prisma Data Proxy for better serverless support

### Monitoring

- View deployment logs in Vercel Dashboard
- Monitor Supabase usage and performance
- Set up error tracking (e.g., Sentry)

## Alternative Deployment Options

### Netlify
- Similar process to Vercel
- Add environment variables in Netlify Dashboard
- Configure build settings

### Self-Hosted
- Build the app: `npm run build`
- Start production server: `npm start`
- Use a process manager like PM2
- Set up reverse proxy with Nginx

## Security Checklist

- [ ] All environment variables are set
- [ ] Supabase Row Level Security (RLS) policies are configured
- [ ] API keys are not exposed in client code
- [ ] HTTPS is enabled
- [ ] Redirect URLs are properly configured
- [ ] Email confirmation is enabled for authentication
