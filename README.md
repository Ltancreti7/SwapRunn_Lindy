# SwapRunn - Vehicle Logistics Platform

A comprehensive full-stack logistics coordination platform connecting car dealerships and freelance drivers for seamless vehicle deliveries and dealer swaps.

## 🚀 Features

### Core Functionality
- **Role-Based Access Control**: Multi-role system (Admin, Dealership Admin, Salesperson, Driver)
- **Job Management**: Create, accept, track, and complete delivery jobs
- **Real-Time Messaging**: Direct communication between salespeople and drivers
- **Driver Ratings & Reviews**: Quality assurance through community feedback
- **Payment Processing**: Secure payment tracking and driver earnings management
- **Analytics Dashboard**: Comprehensive metrics for dealership admins

### User Roles

#### Salesperson
- Create delivery jobs with vehicle details
- Browse and filter available drivers
- Track job progress in real-time
- Rate drivers after job completion
- Manage job history and analytics

#### Driver
- Browse available jobs
- Accept jobs matching their service area
- Track earnings and payment history
- Receive ratings and build reputation
- Manage profile and service preferences

#### Dealership Admin
- Manage team of salespeople
- View dealership-wide analytics
- Monitor job completion rates
- Track revenue and performance metrics
- Manage team members

#### Platform Admin
- Approve/reject dealership registrations
- Manage all users and dealerships
- View platform-wide analytics
- Monitor system health and metrics

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **UI Components**: shadcn/ui with Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: bcryptjs for password hashing
- **Icons**: lucide-react
- **Styling**: Tailwind CSS with custom SwapRunn branding

## 📁 Project Structure

```
swaprunn/
├── app/
│   ├── page.tsx                          # Landing page
│   ├── auth/
│   │   ├── signup/page.tsx              # User registration
│   │   ├── login/page.tsx               # User login
│   │   └── dealership-register/page.tsx # Dealership registration
│   ├── dashboard/
│   │   ├── salesperson/page.tsx         # Salesperson dashboard
│   │   ├── driver/page.tsx              # Driver dashboard
│   │   ├── dealership/page.tsx          # Dealership admin dashboard
│   │   ├── admin/page.tsx               # Platform admin dashboard
│   │   ├── jobs/[id]/page.tsx           # Job details page
│   │   ├── drivers/[id]/page.tsx        # Driver profile page
│   │   ├── messages/page.tsx            # Messaging interface
│   │   ├── profile/page.tsx             # User profile
│   │   ├── earnings/page.tsx            # Driver earnings
│   │   ├── find-drivers/page.tsx        # Driver search
│   │   ├── rate/page.tsx                # Rate driver
│   │   ├── notifications/page.tsx       # Notifications
│   │   ├── support/page.tsx             # Help & support
│   │   └── settings/page.tsx            # Account settings
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup/route.ts          # User registration API
│   │   │   ├── login/route.ts           # Authentication API
│   │   │   └── dealership-register/route.ts
│   │   ├── jobs/
│   │   │   ├── route.ts                 # Fetch jobs
│   │   │   ├── create/route.ts          # Create job
│   │   │   ├── accept/route.ts          # Accept job
│   │   │   └── complete/route.ts        # Complete job
│   │   ├── drivers/route.ts             # Search drivers
│   │   ├── dealerships/
│   │   │   ├── route.ts                 # Fetch dealerships
│   │   │   ├── approve/route.ts         # Approve dealership
│   │   │   └── reject/route.ts          # Reject dealership
│   │   ├── messages/route.ts            # Messaging API
│   │   ├── ratings/route.ts             # Driver ratings
│   │   ├── payments/route.ts            # Payment tracking
│   │   └── users/[id]/route.ts          # User profile API
│   ├── globals.css                      # Global styles
│   └── layout.tsx                       # Root layout
├── prisma/
│   └── schema.prisma                    # Database schema
├── lib/
│   ├── db.ts                            # Prisma client
│   └── types.ts                         # TypeScript types
└── public/                              # Static assets
```

## 🗄️ Database Schema

### User
- id, name, email, password, role, createdAt, updatedAt

### Dealership
- id, name, address, contactEmail, phone, status, adminId, createdAt, updatedAt

### Salesperson
- id, userId, dealershipId, createdAt, updatedAt

### Driver
- id, userId, licenseNumber, licenseExpiry, serviceRadius, averageRating, completedJobs, status, createdAt, updatedAt

### Job
- id, vehicleInfo, vin, pickupLocation, dropoffLocation, scheduledAt, paymentAmount, notes, status, salespersonId, driverId, acceptedAt, completedAt, createdAt, updatedAt

### Message
- id, senderId, recipientId, jobId, content, createdAt

### Payment
- id, jobId, driverId, amount, status, type, createdAt, updatedAt

### Rating
- id, jobId, driverId, rating, comment, createdAt

## 🎨 Design System

### Brand Colors
- **Primary Red**: #E50914
- **Black**: #0B0B0B
- **White**: #FFFFFF
- **Gray Scale**: #F3F4F6, #E5E7EB, #D1D5DB, #9CA3AF, #6B7280, #4B5563, #374151, #1F2937

### Typography
- **Font**: Inter
- **Headings**: Bold, 24px-32px
- **Body**: Regular, 14px-16px
- **Small**: Regular, 12px-14px

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/swaprunn.git
cd swaprunn
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Create database**
```bash
createdb -h localhost swaprunn
```

5. **Run migrations**
```bash
npx prisma migrate dev
```

6. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/signup
Register a new user
```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "DRIVER",
  "licenseNumber": "DL123456",
  "serviceRadius": 50
}
```

#### POST /api/auth/login
Authenticate user
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Job Endpoints

#### GET /api/jobs
Fetch jobs with optional filtering
```
?status=OPEN&page=1&limit=10
```

#### POST /api/jobs/create
Create a new job
```json
{
  "vehicleInfo": "2024 Toyota Camry",
  "vin": "4T1BF1AK5CU123456",
  "pickupLocation": "123 Main St",
  "dropoffLocation": "456 Oak Ave",
  "paymentAmount": 150,
  "notes": "Handle with care"
}
```

#### POST /api/jobs/accept
Accept a job as driver
```json
{
  "jobId": "job-123",
  "driverId": "driver-456"
}
```

#### POST /api/jobs/complete
Mark job as completed
```json
{
  "jobId": "job-123",
  "notes": "Delivery completed successfully"
}
```

### Driver Endpoints

#### GET /api/drivers
Search drivers
```
?minRating=4.5&status=AVAILABLE&search=John&page=1&limit=10
```

### Messaging Endpoints

#### POST /api/messages
Send a message
```json
{
  "senderId": "user-123",
  "recipientId": "user-456",
  "jobId": "job-789",
  "content": "I'm on my way"
}
```

#### GET /api/messages
Fetch messages
```
?userId1=user-123&userId2=user-456&limit=50
```

### Rating Endpoints

#### POST /api/ratings
Submit a rating
```json
{
  "jobId": "job-123",
  "driverId": "driver-456",
  "rating": 5,
  "comment": "Excellent service!"
}
```

## 🔐 Security Features

- Password hashing with bcryptjs
- Role-based access control
- Input validation on all endpoints
- SQL injection prevention via Prisma
- CORS protection
- Secure session management

## 📊 Analytics & Reporting

### Salesperson Analytics
- Active jobs count
- Completed jobs count
- Total earnings
- Average driver rating

### Driver Analytics
- Available jobs count
- Active jobs count
- Total earnings
- Completed jobs count
- Average rating

### Dealership Analytics
- Total jobs
- Completed jobs
- Total revenue
- Team member count
- Completion rate
- Average rating
- Revenue growth

### Platform Analytics
- Total dealerships
- Total users
- Total jobs
- Platform revenue
- User distribution
- Performance metrics

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## 📝 Environment Variables

```
DATABASE_URL=postgresql://user:password@localhost:5432/swaprunn
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## 🚢 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

### Docker Deployment

```bash
docker build -t swaprunn .
docker run -p 3000:3000 swaprunn
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email support@swaprunn.com or visit our help center at https://swaprunn.com/support

## 🎯 Roadmap

- [ ] Mobile app (iOS/Android)
- [ ] Real-time GPS tracking
- [ ] Advanced analytics dashboard
- [ ] Integration with vehicle telematics
- [ ] Automated payment processing
- [ ] Multi-language support
- [ ] API for third-party integrations
- [ ] Machine learning for job matching

## 👥 Team

- **Product**: SwapRunn Team
- **Engineering**: Full-stack development team
- **Design**: UI/UX design team

---

**SwapRunn** - Making Vehicle Logistics Simple ✨
