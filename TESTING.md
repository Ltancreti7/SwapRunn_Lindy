# SwapRunn Testing Guide

Comprehensive testing documentation for the SwapRunn platform.

## Table of Contents

1. [Testing Strategy](#testing-strategy)
2. [Unit Testing](#unit-testing)
3. [Integration Testing](#integration-testing)
4. [End-to-End Testing](#end-to-end-testing)
5. [Performance Testing](#performance-testing)
6. [Security Testing](#security-testing)
7. [Test Coverage](#test-coverage)

---

## Testing Strategy

### Test Pyramid

```
        /\
       /  \  E2E Tests (10%)
      /____\
     /      \
    /        \ Integration Tests (30%)
   /          \
  /____________\
 /              \
/                \ Unit Tests (60%)
/__________________\
```

### Testing Tools

- **Unit Testing**: Jest
- **Integration Testing**: Jest + Supertest
- **E2E Testing**: Playwright
- **Performance**: k6
- **Security**: OWASP ZAP

---

## Unit Testing

### Setup

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### Configuration

Create `jest.config.js`:

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/page.tsx',
  ],
}
```

### Example Unit Tests

#### API Route Test

```typescript
// app/api/jobs/create/__tests__/route.test.ts
import { POST } from '../route'
import { NextRequest } from 'next/server'

describe('POST /api/jobs/create', () => {
  it('should create a job with valid input', async () => {
    const request = new NextRequest('http://localhost:3000/api/jobs/create', {
      method: 'POST',
      body: JSON.stringify({
        vehicleInfo: '2024 Toyota Camry',
        vin: '4T1BF1AK5CU123456',
        pickupLocation: '123 Main St',
        dropoffLocation: '456 Oak Ave',
        paymentAmount: 150,
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(201)

    const data = await response.json()
    expect(data.success).toBe(true)
    expect(data.data.id).toBeDefined()
  })

  it('should reject invalid input', async () => {
    const request = new NextRequest('http://localhost:3000/api/jobs/create', {
      method: 'POST',
      body: JSON.stringify({
        vehicleInfo: '',
        paymentAmount: -100,
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })
})
```

#### Component Test

```typescript
// app/dashboard/components/__tests__/JobCard.test.tsx
import { render, screen } from '@testing-library/react'
import JobCard from '../JobCard'

describe('JobCard Component', () => {
  const mockJob = {
    id: '1',
    vehicleInfo: '2024 Toyota Camry',
    pickupLocation: '123 Main St',
    dropoffLocation: '456 Oak Ave',
    paymentAmount: 150,
    status: 'OPEN',
  }

  it('should render job information', () => {
    render(<JobCard job={mockJob} />)
    
    expect(screen.getByText('2024 Toyota Camry')).toBeInTheDocument()
    expect(screen.getByText('123 Main St')).toBeInTheDocument()
    expect(screen.getByText('$150')).toBeInTheDocument()
  })

  it('should display correct status badge', () => {
    render(<JobCard job={mockJob} />)
    
    expect(screen.getByText('OPEN')).toHaveClass('bg-green-100')
  })
})
```

### Run Unit Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- JobCard.test.tsx

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

---

## Integration Testing

### Setup

```bash
npm install --save-dev supertest @types/supertest
```

### Example Integration Tests

#### Database Integration Test

```typescript
// app/api/jobs/__tests__/integration.test.ts
import { POST as createJob } from '../create/route'
import { GET as getJobs } from '../route'
import { prisma } from '@/lib/db'

describe('Jobs API Integration', () => {
  beforeEach(async () => {
    // Clear database
    await prisma.job.deleteMany({})
  })

  it('should create and retrieve a job', async () => {
    // Create job
    const createRequest = new NextRequest('http://localhost:3000/api/jobs/create', {
      method: 'POST',
      body: JSON.stringify({
        vehicleInfo: '2024 Toyota Camry',
        vin: '4T1BF1AK5CU123456',
        pickupLocation: '123 Main St',
        dropoffLocation: '456 Oak Ave',
        paymentAmount: 150,
      }),
    })

    const createResponse = await createJob(createRequest)
    const createdJob = await createResponse.json()

    // Retrieve jobs
    const getRequest = new NextRequest('http://localhost:3000/api/jobs')
    const getResponse = await getJobs(getRequest)
    const jobs = await getResponse.json()

    expect(jobs.data.jobs).toHaveLength(1)
    expect(jobs.data.jobs[0].id).toBe(createdJob.data.id)
  })

  it('should handle job acceptance workflow', async () => {
    // Create job
    const job = await prisma.job.create({
      data: {
        vehicleInfo: '2024 Toyota Camry',
        vin: '4T1BF1AK5CU123456',
        pickupLocation: '123 Main St',
        dropoffLocation: '456 Oak Ave',
        paymentAmount: 150,
        status: 'OPEN',
        salespersonId: 'salesperson-1',
      },
    })

    // Accept job
    const acceptRequest = new NextRequest('http://localhost:3000/api/jobs/accept', {
      method: 'POST',
      body: JSON.stringify({
        jobId: job.id,
        driverId: 'driver-1',
      }),
    })

    const acceptResponse = await POST(acceptRequest)
    expect(acceptResponse.status).toBe(200)

    // Verify status changed
    const updatedJob = await prisma.job.findUnique({
      where: { id: job.id },
    })
    expect(updatedJob?.status).toBe('ACCEPTED')
    expect(updatedJob?.driverId).toBe('driver-1')
  })
})
```

#### Authentication Integration Test

```typescript
// app/api/auth/__tests__/integration.test.ts
describe('Authentication Flow', () => {
  it('should complete signup and login flow', async () => {
    // Signup
    const signupRequest = new NextRequest('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Smith',
        email: 'john@example.com',
        password: 'SecurePassword123',
        role: 'DRIVER',
      }),
    })

    const signupResponse = await POST(signupRequest)
    expect(signupResponse.status).toBe(201)

    // Login
    const loginRequest = new NextRequest('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'john@example.com',
        password: 'SecurePassword123',
      }),
    })

    const loginResponse = await POST(loginRequest)
    expect(loginResponse.status).toBe(200)

    const data = await loginResponse.json()
    expect(data.data.token).toBeDefined()
  })
})
```

### Run Integration Tests

```bash
# Run integration tests
npm test -- integration.test.ts

# Run with database
DATABASE_URL=postgresql://test:test@localhost:5432/swaprunn_test npm test
```

---

## End-to-End Testing

### Setup

```bash
npm install --save-dev @playwright/test
npx playwright install
```

### Configuration

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### Example E2E Tests

#### User Registration Flow

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test.describe('User Registration', () => {
  test('should complete driver registration', async ({ page }) => {
    // Navigate to signup
    await page.goto('/auth/signup')

    // Fill form
    await page.fill('input[name="name"]', 'John Smith')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('input[name="password"]', 'SecurePassword123')
    await page.selectOption('select[name="role"]', 'DRIVER')
    await page.fill('input[name="licenseNumber"]', 'DL123456789')
    await page.fill('input[name="serviceRadius"]', '50')

    // Submit
    await page.click('button:has-text("Sign Up")')

    // Verify redirect
    await expect(page).toHaveURL('/dashboard/driver')
  })
})
```

#### Job Creation Flow

```typescript
// e2e/jobs.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Job Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/auth/login')
    await page.fill('input[name="email"]', 'salesperson@example.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button:has-text("Login")')
    await page.waitForURL('/dashboard/salesperson')
  })

  test('should create a new job', async ({ page }) => {
    // Navigate to create job
    await page.click('button:has-text("Create Job")')

    // Fill job details
    await page.fill('input[name="vehicleInfo"]', '2024 Toyota Camry')
    await page.fill('input[name="vin"]', '4T1BF1AK5CU123456')
    await page.fill('input[name="pickupLocation"]', '123 Main St')
    await page.fill('input[name="dropoffLocation"]', '456 Oak Ave')
    await page.fill('input[name="paymentAmount"]', '150')

    // Submit
    await page.click('button:has-text("Create Job")')

    // Verify success
    await expect(page.locator('text=Job created successfully')).toBeVisible()
  })

  test('should accept a job as driver', async ({ page }) => {
    // Navigate to available jobs
    await page.goto('/dashboard/driver')
    await page.click('button:has-text("Available Jobs")')

    // Accept first job
    await page.click('button:has-text("Accept Job"):first-of-type')

    // Verify acceptance
    await expect(page.locator('text=Job accepted')).toBeVisible()
  })
})
```

#### Messaging Flow

```typescript
// e2e/messaging.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Messaging', () => {
  test('should send and receive messages', async ({ browser }) => {
    // Create two browser contexts (two users)
    const context1 = await browser.newContext()
    const context2 = await browser.newContext()

    const page1 = await context1.newPage()
    const page2 = await context2.newPage()

    // Login as salesperson
    await page1.goto('/auth/login')
    await page1.fill('input[name="email"]', 'salesperson@example.com')
    await page1.fill('input[name="password"]', 'password123')
    await page1.click('button:has-text("Login")')

    // Login as driver
    await page2.goto('/auth/login')
    await page2.fill('input[name="email"]', 'driver@example.com')
    await page2.fill('input[name="password"]', 'password123')
    await page2.click('button:has-text("Login")')

    // Navigate to messages
    await page1.goto('/dashboard/messages')
    await page2.goto('/dashboard/messages')

    // Send message from salesperson
    await page1.fill('textarea[name="message"]', 'Hello, are you available?')
    await page1.click('button:has-text("Send")')

    // Verify message received on driver side
    await page2.waitForTimeout(1000)
    await expect(page2.locator('text=Hello, are you available?')).toBeVisible()
  })
})
```

### Run E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run specific test
npm run test:e2e -- auth.spec.ts

# Run in headed mode (see browser)
npm run test:e2e -- --headed

# Run in debug mode
npm run test:e2e -- --debug
```

---

## Performance Testing

### Setup

```bash
npm install --save-dev k6
```

### Example Performance Tests

```javascript
// performance/jobs.js
import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 100 },
    { duration: '20s', target: 0 },
  ],
}

export default function () {
  // Test job creation
  const createResponse = http.post('http://localhost:3000/api/jobs/create', {
    vehicleInfo: '2024 Toyota Camry',
    vin: '4T1BF1AK5CU123456',
    pickupLocation: '123 Main St',
    dropoffLocation: '456 Oak Ave',
    paymentAmount: 150,
  })

  check(createResponse, {
    'status is 201': (r) => r.status === 201,
    'response time < 500ms': (r) => r.timings.duration < 500,
  })

  sleep(1)

  // Test job retrieval
  const getResponse = http.get('http://localhost:3000/api/jobs')

  check(getResponse, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  })

  sleep(1)
}
```

### Run Performance Tests

```bash
# Run performance tests
k6 run performance/jobs.js

# Run with output
k6 run --out json=results.json performance/jobs.js
```

---

## Security Testing

### OWASP Top 10 Checks

```bash
npm install --save-dev owasp-zap-cli
```

### Manual Security Tests

#### SQL Injection Test

```typescript
test('should prevent SQL injection', async () => {
  const maliciousInput = "'; DROP TABLE jobs; --"
  
  const request = new NextRequest('http://localhost:3000/api/jobs', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const response = await GET(request)
  expect(response.status).toBe(200)
  
  // Verify table still exists
  const jobs = await prisma.job.findMany()
  expect(jobs).toBeDefined()
})
```

#### XSS Prevention Test

```typescript
test('should prevent XSS attacks', async () => {
  const xssPayload = '<script>alert("XSS")</script>'
  
  const request = new NextRequest('http://localhost:3000/api/jobs/create', {
    method: 'POST',
    body: JSON.stringify({
      vehicleInfo: xssPayload,
      vin: '4T1BF1AK5CU123456',
      pickupLocation: '123 Main St',
      dropoffLocation: '456 Oak Ave',
      paymentAmount: 150,
    }),
  })

  const response = await POST(request)
  const data = await response.json()
  
  // Verify payload is escaped
  expect(data.data.vehicleInfo).not.toContain('<script>')
})
```

#### CSRF Protection Test

```typescript
test('should require CSRF token', async () => {
  const request = new NextRequest('http://localhost:3000/api/jobs/create', {
    method: 'POST',
    body: JSON.stringify({
      vehicleInfo: '2024 Toyota Camry',
      vin: '4T1BF1AK5CU123456',
      pickupLocation: '123 Main St',
      dropoffLocation: '456 Oak Ave',
      paymentAmount: 150,
    }),
  })

  const response = await POST(request)
  expect(response.status).toBe(403)
})
```

---

## Test Coverage

### Generate Coverage Report

```bash
npm test -- --coverage
```

### Coverage Targets

- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

### View Coverage Report

```bash
# Generate HTML report
npm test -- --coverage --coverageReporters=html

# Open report
open coverage/index.html
```

---

## CI/CD Integration

### GitHub Actions

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: swaprunn_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      
      - run: npm run build
      
      - run: npm test -- --coverage
      
      - run: npm run test:e2e
      
      - uses: codecov/codecov-action@v3
```

---

## Best Practices

1. **Write tests first** (TDD approach)
2. **Keep tests isolated** (no dependencies between tests)
3. **Use meaningful test names** (describe what is being tested)
4. **Mock external dependencies** (APIs, databases)
5. **Test edge cases** (empty inputs, large datasets)
6. **Maintain test data** (use fixtures and factories)
7. **Run tests frequently** (before commits)
8. **Monitor coverage** (aim for 80%+)

---

Last Updated: November 10, 2025
