# SwapRunn_Lindy

Full-stack logistics coordination platform for car dealerships and freelance drivers — built with Next.js 14, Tailwind, Supabase, and automated through Lindy AI.

## Features

- ✅ Next.js 14 with App Router
- ✅ TypeScript for type safety
- ✅ TailwindCSS for styling
- ✅ shadcn/ui component library
- ✅ Supabase for authentication and database
- ✅ Prisma ORM for database management
- ✅ Role-based dashboards (Dealership, Salesperson, Driver)
- ✅ Authentication (Login/Signup)
- ✅ Middleware for protected routes
- ✅ Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project
- PostgreSQL database (provided by Supabase)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ltancreti7/SwapRunn_Lindy.git
cd SwapRunn_Lindy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `DATABASE_URL`: Your PostgreSQL database URL

5. Run Prisma migrations (optional, when database is set up):
```bash
npx prisma generate
npx prisma migrate dev
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
SwapRunn_Lindy/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── auth/              # Authentication pages
│   │   │   ├── login/         # Login page
│   │   │   └── signup/        # Signup page
│   │   ├── dashboard/         # Role-based dashboards
│   │   │   ├── dealership/    # Dealership dashboard
│   │   │   ├── salesperson/   # Salesperson dashboard
│   │   │   └── driver/        # Driver dashboard
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   └── ui/               # shadcn/ui components
│   ├── lib/                   # Utility functions
│   │   ├── supabase/         # Supabase clients
│   │   └── utils.ts          # Helper functions
│   └── middleware.ts          # Auth middleware
├── prisma/
│   └── schema.prisma          # Prisma schema
├── .env.example               # Environment variables template
└── package.json
```

## User Roles

The application supports three user roles:

1. **Dealership**: Manage vehicle transport requests and coordinate with drivers
2. **Salesperson**: Track customer vehicle deliveries
3. **Driver**: Find transport jobs, manage routes, and track earnings

## Deployment

### Vercel

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables

Make sure to set these environment variables in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL`

## Technologies Used

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Deployment**: Vercel

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
