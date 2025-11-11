# SwapRunn Platform Redesign - Implementation Guide

## Project Overview

This document provides a comprehensive guide to the SwapRunn platform redesign, including implementation details, component architecture, and design system specifications.

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Existing SwapRunn backend (Supabase, Prisma)

### Installation & Running

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will be available at `http://localhost:3000`

## Design System Architecture

### Color Palette

```css
/* Primary Colors */
--swaprunn-red: #E50914;
--swaprunn-red-light: #FF4B2B;
--swaprunn-red-dark: #C40812;

/* Neutral Colors */
--swaprunn-black: #111111;
--swaprunn-gray-dark: #333333;
--swaprunn-gray: #666666;
--swaprunn-gray-light: #999999;
--swaprunn-silver: #D1D1D1;
--swaprunn-off-white: #F8F8F8;

/* Status Colors */
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
--info: #3B82F6;
```

### Typography System

```css
/* Headings */
font-family: 'Poppins', 'DM Sans';
font-weight: 700;
line-height: 1.2;

/* Body */
font-family: 'Inter', 'Work Sans';
font-weight: 400;
line-height: 1.6;

/* Sizes */
h1: 3rem (48px)
h2: 2rem (32px)
h3: 1.5rem (24px)
h4: 1.25rem (20px)
body: 1rem (16px)
small: 0.875rem (14px)
```

### Spacing System

```css
/* 8px Grid System */
xs: 0.5rem (8px)
sm: 1rem (16px)
md: 1.5rem (24px)
lg: 2rem (32px)
xl: 3rem (48px)
2xl: 4rem (64px)
```

### Shadow System

```css
/* Card Shadow */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

/* Elevated Shadow */
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

/* Focus Shadow */
box-shadow: 0 0 0 3px rgba(229, 9, 20, 0.1);

/* Glow Shadow */
box-shadow: 0 0 20px rgba(229, 9, 20, 0.2);
```

## Component Architecture

### Base Components

#### Card Component
```typescript
// Usage
<Card>Content</Card>
<Card glass>Glassmorphism</Card>
<Card elevated>Elevated</Card>
<Card hover>Hover effect</Card>
```

#### StatCard Component
```typescript
// Usage
<StatCard
  icon={<TrendingUp size={32} />}
  label="Total Jobs"
  value="47"
  change="↑ 12% this week"
  trend="up"
/>
```

#### JobCard Component
```typescript
// Usage
<JobCard
  id="JOB-001"
  vehicleType="2024 Tesla Model 3"
  pickupLocation="Downtown Dealership"
  dropoffLocation="Customer Home"
  status="open"
  payment={150}
  onClick={() => {}}
/>
```

#### DriverCard Component
```typescript
// Usage
<DriverCard
  name="John Smith"
  rating={4.8}
  reviews={45}
  status="available"
  location="Claremont, CA"
  specialties={['Sedan', 'SUV']}
/>
```

### Layout Components

#### Navigation Component
- Responsive navbar with logo
- Context-aware back button
- Mobile hamburger menu
- Animated sidebar
- Logout functionality

#### Footer Component
- Brand section
- Quick links
- Contact information
- Social media links
- Responsive grid layout

#### Help Button Component
- Floating support button
- Modal interface
- Contact form
- FAQ links

## Page Implementation Details

### Homepage (`/app/page.tsx`)

**Key Sections:**
1. Hero Section
   - Animated gradient background
   - Main tagline with text gradient
   - Subtitle with trust indicators
   - CTA buttons

2. Features Section
   - 6 feature cards in grid
   - Icons from lucide-react
   - Hover animations
   - Staggered reveal on scroll

3. How It Works
   - 4-step process
   - Timeline visualization
   - Connector lines between steps
   - Numbered cards

4. Testimonials
   - 3 user testimonials
   - Star ratings
   - User avatars
   - Quote text

5. CTA Section
   - Gradient background
   - Call-to-action button
   - Animated elements

**Animations:**
- Initial fade-in on page load
- Scroll-triggered animations
- Hover effects on cards
- Staggered animations for lists

### Authentication Pages

#### Login Page (`/app/auth/login/page.tsx`)
- Split layout design
- Icon-prefixed inputs
- Password visibility toggle
- Error handling
- Loading states
- Links to signup and dealership registration

#### Signup Page (`/app/auth/signup/page.tsx`)
- Role selection (Salesperson/Driver)
- Dynamic form fields
- Driver-specific fields
- Password confirmation
- Terms acceptance
- Animated transitions

### Dashboard Pages

#### Salesperson Dashboard (`/app/dashboard/salesperson/page.tsx`)
- 4 stat cards with trends
- Weekly performance chart
- Quick stats sidebar
- Active jobs grid
- Empty state handling

#### Driver Dashboard (`/app/dashboard/driver/page.tsx`)
- 4 stat cards
- Monthly earnings chart
- Performance metrics with progress bars
- Available jobs section
- Job acceptance workflow

#### Find Drivers (`/app/dashboard/find-drivers/page.tsx`)
- Search functionality
- Filter dropdowns (Rating, Status)
- Driver list with detailed cards
- View Profile and Assign Job actions
- Results counter
- Empty state

#### Driver Profile (`/app/dashboard/drivers/[id]/page.tsx`)
- Driver information card
- Contact details
- Performance metrics
- Reviews section
- Contact and action buttons

#### Job Details (`/app/dashboard/jobs/[id]/page.tsx`)
- Vehicle information
- Pickup & delivery details
- Special notes
- Job timeline
- Assigned driver info
- Payment summary
- Action buttons

#### Create Job (`/app/dashboard/salesperson/create-job/page.tsx`)
- Multi-step form (3 steps)
- Progress indicator
- Vehicle details form
- Pickup & delivery form
- Payment & notes form
- Job summary preview
- Navigation between steps

## Animation Patterns

### Page Transitions
```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
```

### Staggered List Animations
```typescript
{items.map((item, index) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    {item}
  </motion.div>
))}
```

### Hover Effects
```typescript
<motion.div
  whileHover={{ scale: 1.02, y: -4 }}
  transition={{ duration: 0.2 }}
>
  Content
</motion.div>
```

## Form Patterns

### Input Field Structure
```typescript
<div className="form-group">
  <label htmlFor="field" className="block text-sm font-semibold mb-2">
    Label
  </label>
  <div className="relative">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2" />
    <input
      id="field"
      type="text"
      placeholder="Placeholder"
      className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red focus:shadow-focus transition-all"
    />
  </div>
</div>
```

### Button Variants
```typescript
// Primary
<button className="btn-primary">Primary Button</button>

// Secondary
<button className="btn-secondary">Secondary Button</button>

// Ghost
<button className="btn-ghost">Ghost Button</button>

// Outline
<button className="btn-primary-outline">Outline Button</button>

// Small
<button className="btn-primary btn-sm">Small Button</button>
```

## Responsive Design Breakpoints

```css
/* Mobile First */
default: 0px
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Grid Patterns
```typescript
// Auto-responsive grid
<div className="grid-auto">
  {items.map(item => <Card>{item}</Card>)}
</div>

// 2-column on mobile, 3 on tablet, 4 on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {items.map(item => <Card>{item}</Card>)}
</div>
```

## State Management

### Form State Pattern
```typescript
const [formData, setFormData] = useState({
  field1: '',
  field2: '',
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
```

### Loading States
```typescript
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    // API call
  } finally {
    setIsLoading(false);
  }
};
```

## API Integration

### Fetch Pattern
```typescript
const response = await fetch('/api/endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});

const data = await response.json();

if (!response.ok) {
  throw new Error(data.error);
}
```

## Performance Optimization

### Code Splitting
- Each page is automatically code-split by Next.js
- Components are lazy-loaded when needed

### Image Optimization
- Use Next.js Image component for optimization
- Implement responsive images with srcSet

### Animation Performance
- Use `will-change` CSS property for animated elements
- Prefer `transform` and `opacity` for animations
- Use `viewport` prop in Framer Motion for scroll animations

## Accessibility

### ARIA Labels
```typescript
<button aria-label="Close menu">
  <X size={24} />
</button>
```

### Semantic HTML
```typescript
<nav>Navigation</nav>
<main>Main content</main>
<footer>Footer</footer>
<section>Section</section>
<article>Article</article>
```

### Focus Management
```css
:focus {
  outline: 2px solid #E50914;
  outline-offset: 2px;
}
```

## Testing Checklist

- [ ] All pages load without errors
- [ ] Navigation works on all pages
- [ ] Forms submit correctly
- [ ] Animations are smooth
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] All buttons are clickable
- [ ] Links navigate correctly
- [ ] Loading states display
- [ ] Error messages show
- [ ] Empty states display

## Deployment

### Build Process
```bash
npm run build
```

### Environment Variables
```
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Deployment Platforms
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Docker container

## Troubleshooting

### Common Issues

**Issue: Animations not working**
- Ensure Framer Motion is installed: `npm install motion`
- Check that components are wrapped with `motion.div`

**Issue: Styles not applying**
- Clear Tailwind cache: `rm -rf .next`
- Rebuild: `npm run dev`

**Issue: Images not loading**
- Check image paths are correct
- Ensure images are in public folder

**Issue: Forms not submitting**
- Check API endpoint is correct
- Verify CORS settings
- Check network tab in browser dev tools

## Support & Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide React Icons](https://lucide.dev/)
- [Recharts Documentation](https://recharts.org/)

## Version History

- **v1.0.0** (Current) - Initial redesign with 9 pages, complete design system, and animations

## License

SwapRunn Platform © 2025. All rights reserved.
