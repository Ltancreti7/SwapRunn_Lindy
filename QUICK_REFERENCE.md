# SwapRunn Platform Redesign - Quick Reference Guide

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Format code
npm run format

# Lint code
npm run lint
```

## 📁 Project Structure

```
swaprunn/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/
│   │   ├── salesperson/
│   │   │   ├── page.tsx
│   │   │   └── create-job/page.tsx
│   │   ├── driver/page.tsx
│   │   ├── find-drivers/page.tsx
│   │   ├── drivers/[id]/page.tsx
│   │   └── jobs/[id]/page.tsx
│   ├── page.tsx (homepage)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── Card.tsx
│   ├── HelpButton.tsx
│   └── ...
├── public/
│   └── (images, icons, etc.)
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 🎨 Design System Quick Reference

### Colors
```typescript
// Primary
#E50914 (SwapRunn Red)
#FF4B2B (Red Light)

// Neutral
#111111 (Black)
#F8F8F8 (Off-white)
#D1D1D1 (Silver)

// Status
#10B981 (Success)
#F59E0B (Warning)
#EF4444 (Error)
#3B82F6 (Info)
```

### Typography
```typescript
// Headings: Poppins, DM Sans (700)
// Body: Inter, Work Sans (400)

h1: 3rem
h2: 2rem
h3: 1.5rem
body: 1rem
small: 0.875rem
```

### Spacing (8px grid)
```typescript
xs: 8px
sm: 16px
md: 24px
lg: 32px
xl: 48px
2xl: 64px
```

## 🧩 Component Usage

### Card Component
```typescript
import { Card } from '@/components/Card';

// Basic card
<Card>Content</Card>

// With variants
<Card glass>Glassmorphism</Card>
<Card elevated>Elevated</Card>
<Card hover>Hover effect</Card>
```

### StatCard Component
```typescript
import { Card, StatCard } from '@/components/Card';
import { TrendingUp } from 'lucide-react';

<StatCard
  icon={<TrendingUp size={32} />}
  label="Total Jobs"
  value="47"
  change="↑ 12% this week"
  trend="up"
/>
```

### Navigation Component
```typescript
import { Navigation } from '@/components/Navigation';

// Add to layout or page
<Navigation />
```

### Footer Component
```typescript
import { Footer } from '@/components/Footer';

// Add to layout or page
<Footer />
```

### Help Button Component
```typescript
import { HelpButton } from '@/components/HelpButton';

// Add to layout
<HelpButton />
```

## 🎬 Animation Patterns

### Page Load Animation
```typescript
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### Scroll Animation
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

### Staggered List
```typescript
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    {item}
  </motion.div>
))}
```

### Hover Effect
```typescript
<motion.div
  whileHover={{ scale: 1.02, y: -4 }}
  transition={{ duration: 0.2 }}
>
  Content
</motion.div>
```

## 📝 Form Patterns

### Input Field
```typescript
<div className="form-group">
  <label htmlFor="email" className="block text-sm font-semibold mb-2">
    Email
  </label>
  <div className="relative">
    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
    <input
      id="email"
      type="email"
      placeholder="you@example.com"
      className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red focus:shadow-focus transition-all"
    />
  </div>
</div>
```

### Button Variants
```typescript
// Primary
<button className="btn-primary">Primary</button>

// Secondary
<button className="btn-secondary">Secondary</button>

// Ghost
<button className="btn-ghost">Ghost</button>

// Outline
<button className="btn-primary-outline">Outline</button>

// Small
<button className="btn-primary btn-sm">Small</button>

// With Icon
<button className="btn-primary flex items-center gap-2">
  <Icon size={18} />
  Button Text
</button>
```

### Badge Variants
```typescript
// Primary
<span className="badge badge-primary">Primary</span>

// Secondary
<span className="badge badge-secondary">Secondary</span>

// Success
<span className="badge badge-success">Success</span>

// Warning
<span className="badge badge-warning">Warning</span>

// Error
<span className="badge badge-error">Error</span>

// Info
<span className="badge badge-info">Info</span>
```

## 🔄 State Management

### Form State
```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: '',
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
```

### Loading State
```typescript
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    // API call
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};
```

### Error State
```typescript
const [error, setError] = useState('');

{error && (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
  >
    {error}
  </motion.div>
)}
```

## 🌐 Responsive Grid Patterns

### Auto-responsive Grid
```typescript
<div className="grid-auto">
  {items.map(item => <Card>{item}</Card>)}
</div>
```

### 2-Column Grid
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {items.map(item => <Card>{item}</Card>)}
</div>
```

### 3-Column Grid
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card>{item}</Card>)}
</div>
```

### 4-Column Grid
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {items.map(item => <Card>{item}</Card>)}
</div>
```

## 📊 Chart Integration

### Line Chart (Recharts)
```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
    <XAxis dataKey="date" stroke="#666" />
    <YAxis stroke="#666" />
    <Tooltip />
    <Line
      type="monotone"
      dataKey="value"
      stroke="#E50914"
      strokeWidth={3}
      dot={{ fill: '#E50914', r: 5 }}
    />
  </LineChart>
</ResponsiveContainer>
```

### Bar Chart (Recharts)
```typescript
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
    <XAxis dataKey="week" stroke="#666" />
    <YAxis stroke="#666" />
    <Tooltip />
    <Legend />
    <Bar dataKey="earnings" fill="#E50914" radius={[8, 8, 0, 0]} />
  </BarChart>
</ResponsiveContainer>
```

## 🔗 Navigation Patterns

### Link Navigation
```typescript
import Link from 'next/link';

<Link href="/dashboard/salesperson" className="btn-primary">
  Go to Dashboard
</Link>
```

### Router Navigation
```typescript
import { useRouter } from 'next/navigation';

const router = useRouter();
router.push('/dashboard/salesperson');
```

### Back Button
```typescript
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

<Link href="/previous-page" className="btn-ghost inline-flex items-center gap-2">
  <ArrowLeft size={18} />
  Back
</Link>
```

## 🎯 Common Page Layouts

### Dashboard Layout
```typescript
<>
  <Navigation />
  <main className="min-h-screen bg-swaprunn-off-white">
    <div className="container-section py-12">
      {/* Header */}
      {/* Stats Grid */}
      {/* Charts */}
      {/* Content */}
    </div>
  </main>
  <Footer />
</>
```

### Form Layout
```typescript
<>
  <Navigation />
  <main className="min-h-screen bg-gradient-to-br from-swaprunn-off-white via-white to-swaprunn-off-white py-12">
    <div className="container-section">
      <Card className="max-w-md mx-auto">
        {/* Form Content */}
      </Card>
    </div>
  </main>
  <Footer />
</>
```

## 🐛 Debugging Tips

### Check Console
```bash
# Open browser dev tools (F12)
# Check Console tab for errors
# Check Network tab for API calls
```

### Inspect Elements
```bash
# Right-click element
# Select "Inspect" or "Inspect Element"
# Check computed styles and classes
```

### React DevTools
```bash
# Install React DevTools browser extension
# Check component tree and props
# Profile performance
```

## 📦 Dependencies

```json
{
  "next": "15.5.3",
  "react": "^19.0.0",
  "tailwindcss": "^4.0.0",
  "motion": "^11.0.0",
  "lucide-react": "^latest",
  "recharts": "^2.10.0"
}
```

## 🚀 Deployment Checklist

- [ ] All pages tested locally
- [ ] No console errors
- [ ] Responsive design verified
- [ ] Animations smooth
- [ ] Forms working
- [ ] API endpoints configured
- [ ] Environment variables set
- [ ] Build successful (`npm run build`)
- [ ] No TypeScript errors
- [ ] Performance optimized

## 📚 Useful Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Recharts Docs](https://recharts.org/)

## 💡 Pro Tips

1. **Use Tailwind's `@apply` directive** for reusable styles
2. **Leverage Framer Motion's `viewport` prop** for scroll animations
3. **Use Next.js Image component** for optimized images
4. **Implement error boundaries** for better error handling
5. **Use React.memo** for performance optimization
6. **Lazy load components** with `dynamic` import
7. **Use TypeScript** for type safety
8. **Test responsive design** on multiple devices
9. **Monitor bundle size** with `npm run analyze`
10. **Use CSS variables** for theme customization

## 🆘 Getting Help

- Check the IMPLEMENTATION_GUIDE.md for detailed documentation
- Review REDESIGN_SUMMARY.md for project overview
- Check component files for usage examples
- Review existing pages for patterns
- Check browser console for error messages

---

**Last Updated**: November 10, 2025
**Version**: 1.0.0
