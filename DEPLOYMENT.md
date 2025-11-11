# SwapRunn Deployment Guide

Complete guide for deploying SwapRunn to production environments.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Vercel Deployment](#vercel-deployment)
5. [Docker Deployment](#docker-deployment)
6. [AWS Deployment](#aws-deployment)
7. [Monitoring & Maintenance](#monitoring--maintenance)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- Node.js 18.0 or higher
- npm 9.0 or higher (or yarn/pnpm)
- PostgreSQL 12 or higher
- Git
- Docker (for containerized deployment)

### Required Accounts

- GitHub account (for version control)
- Vercel account (for serverless deployment)
- AWS account (for cloud deployment)
- SendGrid account (for email notifications)
- Stripe account (for payments)

### System Requirements

- **Minimum**: 2GB RAM, 2 CPU cores
- **Recommended**: 4GB RAM, 4 CPU cores
- **Storage**: 20GB minimum

---

## Environment Setup

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/swaprunn.git
cd swaprunn
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Create Environment File

Create `.env.local` in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/swaprunn

# Authentication
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://swaprunn.com

# Email Service
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@swaprunn.com

# Payment Processing
STRIPE_PUBLIC_KEY=pk_live_your_key
STRIPE_SECRET_KEY=sk_live_your_key

# AWS S3 (for file uploads)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=swaprunn-uploads
AWS_REGION=us-east-1

# Application
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://swaprunn.com/api
LOG_LEVEL=info
```

### 4. Build Application

```bash
npm run build
```

---

## Database Setup

### 1. Create Database

```bash
createdb -h localhost -U postgres swaprunn
```

### 2. Run Migrations

```bash
npx prisma migrate deploy
```

### 3. Seed Database (Optional)

```bash
npx prisma db seed
```

### 4. Verify Connection

```bash
npx prisma db execute --stdin < verify.sql
```

---

## Vercel Deployment

### 1. Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Select your GitHub repository
4. Click "Import"

### 2. Configure Environment Variables

In Vercel Dashboard:

1. Go to Settings → Environment Variables
2. Add all variables from `.env.local`
3. Set environment to Production

### 3. Configure Build Settings

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4. Deploy

```bash
vercel --prod
```

### 5. Configure Custom Domain

1. Go to Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### 6. Enable Automatic Deployments

1. Go to Settings → Git
2. Enable "Automatic Deployments"
3. Select branch (main)

---

## Docker Deployment

### 1. Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

### 2. Create Docker Compose File

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: swaprunn
      POSTGRES_PASSWORD: secure_password
      POSTGRES_DB: swaprunn
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  app:
    build: .
    environment:
      DATABASE_URL: postgresql://swaprunn:secure_password@postgres:5432/swaprunn
      NEXTAUTH_SECRET: your-secret-key
      NEXTAUTH_URL: http://localhost:3000
    ports:
      - "3000:3000"
    depends_on:
      - postgres
    volumes:
      - .:/app
      - /app/node_modules

volumes:
  postgres_data:
```

### 3. Build and Run

```bash
# Build image
docker build -t swaprunn:latest .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL=postgresql://user:password@host:5432/swaprunn \
  -e NEXTAUTH_SECRET=your-secret \
  swaprunn:latest

# Or use Docker Compose
docker-compose up -d
```

### 4. Push to Docker Registry

```bash
# Tag image
docker tag swaprunn:latest your-registry/swaprunn:latest

# Push to registry
docker push your-registry/swaprunn:latest
```

---

## AWS Deployment

### 1. Create RDS Database

```bash
aws rds create-db-instance \
  --db-instance-identifier swaprunn-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password YourSecurePassword123 \
  --allocated-storage 20
```

### 2. Create S3 Bucket

```bash
aws s3 mb s3://swaprunn-uploads --region us-east-1
```

### 3. Deploy to Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize application
eb init -p node.js-18 swaprunn

# Create environment
eb create swaprunn-prod

# Deploy
eb deploy
```

### 4. Configure Environment Variables

```bash
eb setenv \
  DATABASE_URL=postgresql://admin:password@endpoint:5432/swaprunn \
  NEXTAUTH_SECRET=your-secret \
  NODE_ENV=production
```

### 5. Enable Auto-Scaling

```bash
eb scale 2
```

### 6. Configure Load Balancer

```bash
eb config
# Edit load balancer settings
```

---

## Monitoring & Maintenance

### 1. Set Up Logging

```bash
# CloudWatch Logs
aws logs create-log-group --log-group-name /swaprunn/app

# Application Logging
npm install winston
```

### 2. Set Up Monitoring

```bash
# Install monitoring tools
npm install @sentry/nextjs
npm install datadog-browser-rum
```

### 3. Database Backups

```bash
# Automated backups
aws rds modify-db-instance \
  --db-instance-identifier swaprunn-db \
  --backup-retention-period 30

# Manual backup
aws rds create-db-snapshot \
  --db-instance-identifier swaprunn-db \
  --db-snapshot-identifier swaprunn-backup-$(date +%Y%m%d)
```

### 4. Health Checks

```bash
# Configure health check endpoint
GET /api/health

# Response
{
  "status": "healthy",
  "timestamp": "2025-11-10T14:00:00Z",
  "database": "connected",
  "uptime": 3600
}
```

### 5. Performance Monitoring

```bash
# Monitor response times
npm install next-axiom

# Monitor database queries
npm install @prisma/instrumentation
```

---

## SSL/TLS Configuration

### 1. Generate Certificate

```bash
# Using Let's Encrypt
certbot certonly --standalone -d swaprunn.com -d www.swaprunn.com
```

### 2. Configure NGINX

```nginx
server {
    listen 443 ssl http2;
    server_name swaprunn.com www.swaprunn.com;

    ssl_certificate /etc/letsencrypt/live/swaprunn.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/swaprunn.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. Auto-Renewal

```bash
# Set up cron job
0 0 1 * * certbot renew --quiet
```

---

## Performance Optimization

### 1. Enable Caching

```bash
# Redis caching
npm install redis

# Configure in next.config.js
module.exports = {
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
}
```

### 2. Database Optimization

```sql
-- Create indexes
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_driver_id ON jobs(driver_id);
CREATE INDEX idx_messages_user_id ON messages(sender_id, recipient_id);
CREATE INDEX idx_ratings_driver_id ON ratings(driver_id);
```

### 3. Image Optimization

```bash
npm install next-image-export-optimizer
```

### 4. Code Splitting

```bash
npm run build
# Analyze bundle
npm install @next/bundle-analyzer
```

---

## Security Hardening

### 1. Enable CORS

```typescript
// middleware.ts
import { NextResponse } from 'next/server'

export function middleware(request: Request) {
  const response = NextResponse.next()
  response.headers.set('Access-Control-Allow-Origin', 'https://swaprunn.com')
  return response
}
```

### 2. Set Security Headers

```typescript
// next.config.js
module.exports = {
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}
```

### 3. Rate Limiting

```bash
npm install express-rate-limit
```

### 4. Input Validation

```bash
npm install zod
```

---

## Troubleshooting

### Issue: Database Connection Failed

**Solution:**
```bash
# Check connection string
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Verify credentials
psql -h localhost -U postgres -d swaprunn
```

### Issue: Build Fails

**Solution:**
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install

# Rebuild
npm run build
```

### Issue: High Memory Usage

**Solution:**
```bash
# Increase Node memory
NODE_OPTIONS=--max-old-space-size=4096 npm start

# Monitor memory
node --inspect app.js
```

### Issue: Slow Database Queries

**Solution:**
```bash
# Enable query logging
DATABASE_LOG=query npx prisma studio

# Analyze slow queries
EXPLAIN ANALYZE SELECT * FROM jobs WHERE status = 'OPEN';
```

### Issue: SSL Certificate Error

**Solution:**
```bash
# Renew certificate
certbot renew --force-renewal

# Check certificate
openssl s_client -connect swaprunn.com:443
```

---

## Rollback Procedure

### 1. Identify Previous Version

```bash
git log --oneline | head -10
```

### 2. Rollback Code

```bash
git revert <commit-hash>
git push origin main
```

### 3. Rollback Database

```bash
# List migrations
npx prisma migrate status

# Rollback migration
npx prisma migrate resolve --rolled-back <migration-name>
```

### 4. Verify Deployment

```bash
curl https://swaprunn.com/api/health
```

---

## Maintenance Schedule

### Daily
- Monitor error logs
- Check database performance
- Verify uptime

### Weekly
- Review security logs
- Update dependencies
- Backup database

### Monthly
- Performance analysis
- Security audit
- Capacity planning

### Quarterly
- Major updates
- Infrastructure review
- Disaster recovery test

---

## Support & Resources

- **Documentation**: https://docs.swaprunn.com
- **Status Page**: https://status.swaprunn.com
- **Support Email**: support@swaprunn.com
- **Emergency**: emergency@swaprunn.com

---

Last Updated: November 10, 2025
