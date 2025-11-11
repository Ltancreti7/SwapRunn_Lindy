# SwapRunn Project Structure

Complete documentation of the SwapRunn platform directory structure and file organization.

## Directory Tree

```
swaprunn/
├── app/                                    # Next.js app directory
│   ├── page.tsx                           # Landing page
│   ├── layout.tsx                         # Root layout
│   ├── globals.css                        # Global styles
│   │
│   ├── auth/                              # Authentication pages
│   │   ├── signup/
│   │   │   └── page.tsx                   # User registration
│   │   ├── login/
│   │   │   └── page.tsx                   # User login
│   │   └── dealership-register/
│   │       └── page.tsx                   # Dealership registration
│   │
│   ├── dashboard/                         # Dashboard pages
│   │   ├── layout.tsx                     # Dashboard layout
│   │   ├── page.tsx                       # Dashboard home
│   │   │
│   │   ├── salesperson/
│   │   │   └── page.tsx                   # Salesperson dashboard
│   │   ├── driver/
│   │   │   └── page.tsx                   # Driver dashboard
│   │   ├── dealership/
│   │   │   └── page.tsx                   # Dealership admin dashboard
│   │   ├── admin/
│   │   │   └── page.tsx                   # Platform admin dashboard
│   │   │
│   │   ├── jobs/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx               # Job details page
│   │   │   └── create/
│   │   │       └── page.tsx               # Create job page
│   │   │
│   │   ├── drivers/
│   │   │   └── [id]/
│   │   │       └── page.tsx               # Driver profile page
│   │   │
│   │   ├── messages/
│   │   │   └── page.tsx                   # Messaging interface
│   │   │
│   │   ├── profile/
│   │   │   └── page.tsx                   # User profile page
│   │   │
│   │   ├── earnings/
│   │   │   └── page.tsx                   # Driver earnings page
│   │   │
│   │   ├── find-drivers/
│   │   │   └── page.tsx                   # Driver search page
│   │   │
│   │   ├── rate/
│   │   │   └── page.tsx                   # Rate driver page
│   │   │
│   │   ├── notifications/
│   │   │   └── page.tsx                   # Notifications page
│   │   │
│   │   ├── support/
│   │   │   └── page.tsx                   # Help & support page
│   │   │
│   │   └── settings/
│   │       └── page.tsx                   # Account settings page
│   │
│   └── api/                               # API routes
│       ├── auth/
│       │   ├── signup/
│       │   │   └── route.ts               # User registration API
│       │   ├── login/
│       │   │   └── route.ts               # Authentication API
│       │   └── dealership-register/
│       │       └── route.ts               # Dealership registration API
│       │
│       ├── jobs/
│       │   ├── route.ts                   # Fetch jobs
│       │   ├── create/
│       │   │   └── route.ts               # Create job
│       │   ├── accept/
│       │   │   └── route.ts               # Accept job
│       │   └── complete/
│       │       └── route.ts               # Complete job
│       │
│       ├── drivers/
│       │   └── route.ts                   # Search drivers
│       │
│       ├── dealerships/
│       │   ├── route.ts                   # Fetch dealerships
│       │   ├── approve/
│       │   │   └── route.ts               # Approve dealership
│       │   └── reject/
│       │       └── route.ts               # Reject dealership
│       │
│       ├── messages/
│       │   └── route.ts                   # Messaging API
│       │
│       ├── ratings/
│       │   └── route.ts                   # Driver ratings
│       │
│       ├── payments/
│       │   └── route.ts                   # Payment tracking
│       │
│       └── users/
│           └── [id]/
│               └── route.ts               # User profile API
│
├── components/                            # Reusable React components
│   ├── ui/                                # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── tabs.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   │
│   ├── layout/
│   │   ├── Header.tsx                     # Header component
│   │   ├── Sidebar.tsx                    # Sidebar navigation
│   │   └── Footer.tsx                     # Footer component
│   │
│   ├── dashboard/
│   │   ├── JobCard.tsx                    # Job card component
│   │   ├── DriverCard.tsx                 # Driver card component
│   │   ├── StatCard.tsx                   # Statistics card
│   │   └── ...
│   │
│   └── forms/
│       ├── JobForm.tsx                    # Job creation form
│       ├── LoginForm.tsx                  # Login form
│       ├── SignupForm.tsx                 # Signup form
│       └── ...
│
├── lib/                                   # Utility functions and helpers
│   ├── db.ts                              # Prisma client
│   ├── types.ts                           # TypeScript type definitions
│   ├── utils.ts                           # Utility functions
│   ├── auth.ts                            # Authentication utilities
│   ├── validation.ts                      # Input validation
│   └── constants.ts                       # Application constants
│
├── prisma/                                # Database configuration
│   ├── schema.prisma                      # Database schema
│   ├── migrations/                        # Database migrations
│   │   ├── 001_init/
│   │   ├── 002_add_fields/
│   │   └── ...
│   └── seed.ts                            # Database seeding script
│
├── public/                                # Static assets
│   ├── images/
│   │   ├── logo.png
│   │   ├── hero.jpg
│   │   └── ...
│   ├── icons/
│   │   └── ...
│   └── fonts/
│       └── ...
│
├── styles/                                # Global styles
│   ├── globals.css
│   ├── variables.css
│   └── animations.css
│
├── hooks/                                 # Custom React hooks
│   ├── useAuth.ts                         # Authentication hook
│   ├── useJobs.ts                         # Jobs hook
│   ├── useDrivers.ts                      # Drivers hook
│   └── ...
│
├── context/                               # React context providers
│   ├── AuthContext.tsx                    # Authentication context
│   ├── JobsContext.tsx                    # Jobs context
│   └── ...
│
├── __tests__/                             # Test files
│   ├── unit/
│   │   ├── auth.test.ts
│   │   ├── jobs.test.ts
│   │   └── ...
│   ├── integration/
│   │   ├── auth.integration.test.ts
│   │   ├── jobs.integration.test.ts
│   │   └── ...
│   └── e2e/
│       ├── auth.spec.ts
│       ├── jobs.spec.ts
│       └── ...
│
├── .github/                               # GitHub configuration
│   ├── workflows/
│   │   ├── test.yml                       # CI/CD pipeline
│   │   ├── deploy.yml                     # Deployment workflow
│   │   └── ...
│   └── ISSUE_TEMPLATE/
│       └── ...
│
├── docs/                                  # Documentation
│   ├── ARCHITECTURE.md                    # Architecture overview
│   ├── CONTRIBUTING.md                    # Contribution guidelines
│   ├── CHANGELOG.md                       # Version history
│   └── ...
│
├── config/                                # Configuration files
│   ├── next.config.js                     # Next.js configuration
│   ├── tailwind.config.ts                 # Tailwind CSS configuration
│   ├── tsconfig.json                      # TypeScript configuration
│   └── jest.config.js                     # Jest configuration
│
├── .env.example                           # Environment variables template
├── .env.local                             # Local environment variables (git ignored)
├── .gitignore                             # Git ignore rules
├── .eslintrc.json                         # ESLint configuration
├── .prettierrc                            # Prettier configuration
├── package.json                           # Project dependencies
├── package-lock.json                      # Dependency lock file
├── README.md                              # Project README
├── API_DOCUMENTATION.md                   # API documentation
├── DEPLOYMENT.md                          # Deployment guide
├── TESTING.md                             # Testing guide
├── PROJECT_STRUCTURE.md                   # This file
└── LICENSE                                # License file
```

---

## File Descriptions

### Core Application Files

#### `app/page.tsx`
Landing page of the SwapRunn platform. Displays hero section, features, and call-to-action buttons.

#### `app/layout.tsx`
Root layout component that wraps all pages. Includes global providers, navigation, and styling.

#### `app/globals.css`
Global CSS styles for the entire application. Includes Tailwind CSS imports and custom variables.

### Authentication Pages

#### `app/auth/signup/page.tsx`
User registration page. Handles signup for different user roles (Driver, Salesperson, Admin).

#### `app/auth/login/page.tsx`
User login page. Authenticates users and creates sessions.

#### `app/auth/dealership-register/page.tsx`
Dealership registration page. Allows dealership admins to register their business.

### Dashboard Pages

#### `app/dashboard/layout.tsx`
Dashboard layout with sidebar navigation and header. Shared across all dashboard pages.

#### `app/dashboard/salesperson/page.tsx`
Salesperson dashboard showing active jobs, earnings, and driver ratings.

#### `app/dashboard/driver/page.tsx`
Driver dashboard showing available jobs, earnings, and ratings.

#### `app/dashboard/dealership/page.tsx`
Dealership admin dashboard with team management and analytics.

#### `app/dashboard/admin/page.tsx`
Platform admin dashboard for dealership approval and user management.

### Job Management Pages

#### `app/dashboard/jobs/[id]/page.tsx`
Job details page showing vehicle info, locations, driver details, and status.

#### `app/dashboard/jobs/create/page.tsx`
Job creation form for salespeople to post new delivery jobs.

### Driver Pages

#### `app/dashboard/drivers/[id]/page.tsx`
Driver profile page showing ratings, reviews, and performance metrics.

#### `app/dashboard/find-drivers/page.tsx`
Driver search and filtering interface for finding available drivers.

### Communication Pages

#### `app/dashboard/messages/page.tsx`
Real-time messaging interface for communication between users.

#### `app/dashboard/notifications/page.tsx`
Notifications center showing job updates, messages, and payments.

### User Pages

#### `app/dashboard/profile/page.tsx`
User profile page for editing personal information and preferences.

#### `app/dashboard/settings/page.tsx`
Account settings including notifications, security, and privacy options.

#### `app/dashboard/support/page.tsx`
Help and support page with FAQs and support ticket submission.

### Financial Pages

#### `app/dashboard/earnings/page.tsx`
Driver earnings page showing payment history and withdrawal options.

#### `app/dashboard/rate/page.tsx`
Driver rating submission page after job completion.

### API Routes

#### `app/api/auth/signup/route.ts`
POST endpoint for user registration. Validates input and creates user account.

#### `app/api/auth/login/route.ts`
POST endpoint for user authentication. Returns JWT token on success.

#### `app/api/jobs/route.ts`
GET endpoint for fetching jobs with filtering and pagination.

#### `app/api/jobs/create/route.ts`
POST endpoint for creating new jobs. Validates vehicle and location data.

#### `app/api/jobs/accept/route.ts`
POST endpoint for drivers to accept jobs. Updates job status.

#### `app/api/jobs/complete/route.ts`
POST endpoint for completing jobs. Creates payment records.

#### `app/api/drivers/route.ts`
GET endpoint for searching and filtering drivers by rating, location, etc.

#### `app/api/messages/route.ts`
GET/POST endpoints for messaging between users.

#### `app/api/ratings/route.ts`
GET/POST endpoints for driver ratings and reviews.

#### `app/api/payments/route.ts`
GET endpoint for payment history and earnings tracking.

#### `app/api/dealerships/route.ts`
GET endpoint for dealership management and listing.

#### `app/api/dealerships/approve/route.ts`
POST endpoint for admin to approve dealerships.

#### `app/api/dealerships/reject/route.ts`
POST endpoint for admin to reject dealerships.

#### `app/api/users/[id]/route.ts`
GET/PUT endpoints for user profile management.

### Library Files

#### `lib/db.ts`
Prisma client initialization and database connection management.

#### `lib/types.ts`
TypeScript type definitions for all data models and API responses.

#### `lib/utils.ts`
Utility functions for common operations (formatting, validation, etc.).

#### `lib/auth.ts`
Authentication utilities including password hashing and JWT handling.

#### `lib/validation.ts`
Input validation schemas and functions using Zod.

#### `lib/constants.ts`
Application constants like API endpoints, status values, and configuration.

### Database Files

#### `prisma/schema.prisma`
Prisma schema defining all database models and relationships.

#### `prisma/migrations/`
Database migration files for version control of schema changes.

#### `prisma/seed.ts`
Database seeding script for populating test data.

### Component Files

#### `components/ui/`
shadcn/ui components (Button, Card, Input, etc.) for consistent UI.

#### `components/layout/`
Layout components (Header, Sidebar, Footer) used across pages.

#### `components/dashboard/`
Dashboard-specific components (JobCard, DriverCard, StatCard).

#### `components/forms/`
Form components for user input (JobForm, LoginForm, SignupForm).

### Configuration Files

#### `next.config.js`
Next.js configuration including image optimization and API routes.

#### `tailwind.config.ts`
Tailwind CSS configuration with custom colors and theme.

#### `tsconfig.json`
TypeScript configuration with path aliases and compiler options.

#### `jest.config.js`
Jest testing framework configuration.

#### `.eslintrc.json`
ESLint configuration for code quality and style.

#### `.prettierrc`
Prettier configuration for code formatting.

#### `package.json`
Project dependencies and npm scripts.

---

## Key Directories Explained

### `/app`
Next.js app directory containing all pages and API routes. Uses file-based routing.

### `/components`
Reusable React components organized by category (ui, layout, dashboard, forms).

### `/lib`
Utility functions, types, and helpers used throughout the application.

### `/prisma`
Database schema, migrations, and seeding scripts for data persistence.

### `/public`
Static assets like images, icons, and fonts served directly by the web server.

### `/__tests__`
Test files organized by type (unit, integration, e2e).

### `/.github`
GitHub-specific configuration including CI/CD workflows.

### `/docs`
Additional documentation files beyond the main README.

---

## Naming Conventions

### Files
- **Pages**: `page.tsx` (Next.js convention)
- **API Routes**: `route.ts` (Next.js convention)
- **Components**: PascalCase (e.g., `JobCard.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase (e.g., `User.ts`)

### Directories
- **Feature directories**: kebab-case (e.g., `find-drivers`)
- **Component directories**: PascalCase (e.g., `JobCard`)
- **Utility directories**: camelCase (e.g., `lib`)

### Variables & Functions
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_JOBS_PER_PAGE`)
- **Functions**: camelCase (e.g., `formatDate()`)
- **React Components**: PascalCase (e.g., `JobCard`)
- **Hooks**: camelCase with `use` prefix (e.g., `useJobs()`)

---

## Import Paths

### Absolute Imports
```typescript
// Using @ alias (configured in tsconfig.json)
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { Job } from '@/lib/types'
```

### Relative Imports
```typescript
// For nearby files
import { JobCard } from '../JobCard'
import { useJobs } from '../../hooks/useJobs'
```

---

## Best Practices

1. **Keep components small** - Each component should have a single responsibility
2. **Use TypeScript** - Define types for all data structures
3. **Organize by feature** - Group related files together
4. **Use absolute imports** - Makes refactoring easier
5. **Keep API routes focused** - One endpoint per route file
6. **Document complex logic** - Add comments for non-obvious code
7. **Test critical paths** - Write tests for important functionality
8. **Follow naming conventions** - Consistent naming improves readability

---

Last Updated: November 10, 2025
