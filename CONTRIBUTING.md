# Contributing to SwapRunn

Thank you for your interest in contributing to SwapRunn! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [Making Changes](#making-changes)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Coding Standards](#coding-standards)
8. [Testing Requirements](#testing-requirements)
9. [Documentation](#documentation)
10. [Reporting Issues](#reporting-issues)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please read and adhere to our Code of Conduct:

- **Be Respectful**: Treat all community members with respect and dignity
- **Be Inclusive**: Welcome people of all backgrounds and experience levels
- **Be Collaborative**: Work together to solve problems and improve the project
- **Be Professional**: Maintain professional communication in all interactions
- **Report Issues**: Report any violations to conduct@swaprunn.com

---

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm 9.0 or higher
- PostgreSQL 12 or higher
- Git
- GitHub account

### Fork and Clone

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/swaprunn.git
   cd swaprunn
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/swaprunn/swaprunn.git
   ```

---

## Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your local configuration:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/swaprunn_dev
NEXTAUTH_SECRET=your-dev-secret-key
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Set Up Database

```bash
# Create database
createdb -h localhost swaprunn_dev

# Run migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 5. Verify Setup

```bash
# Run tests
npm test

# Check linting
npm run lint

# Build application
npm run build
```

---

## Making Changes

### Create a Feature Branch

```bash
# Update main branch
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
```

### Branch Naming Convention

- **Features**: `feature/description` (e.g., `feature/add-job-filtering`)
- **Bug Fixes**: `fix/description` (e.g., `fix/payment-calculation`)
- **Documentation**: `docs/description` (e.g., `docs/api-endpoints`)
- **Performance**: `perf/description` (e.g., `perf/optimize-queries`)
- **Refactoring**: `refactor/description` (e.g., `refactor/auth-module`)

### Make Your Changes

1. **Write code** following the coding standards
2. **Add tests** for new functionality
3. **Update documentation** as needed
4. **Run linting** to check code quality

```bash
# Format code
npm run format

# Check linting
npm run lint

# Run tests
npm test
```

---

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding or updating tests
- **chore**: Changes to build process, dependencies, etc.

### Scope

The scope specifies what part of the codebase is affected:
- `auth`: Authentication related
- `jobs`: Job management
- `drivers`: Driver functionality
- `payments`: Payment processing
- `api`: API endpoints
- `ui`: User interface
- `db`: Database

### Subject

- Use imperative mood ("add" not "added" or "adds")
- Don't capitalize first letter
- No period (.) at the end
- Limit to 50 characters

### Body

- Explain what and why, not how
- Wrap at 72 characters
- Separate from subject with blank line

### Footer

- Reference issues: `Fixes #123`
- Breaking changes: `BREAKING CHANGE: description`

### Examples

```
feat(jobs): add job filtering by status

Add ability to filter jobs by status (OPEN, ACCEPTED, COMPLETED).
Implements dropdown filter on jobs list page.

Fixes #456
```

```
fix(auth): correct password validation logic

Password validation was incorrectly rejecting valid passwords
with special characters. Updated regex pattern to allow all
special characters except quotes.

Fixes #789
```

```
docs(api): update job endpoints documentation

Added missing parameters and response examples for job creation
and acceptance endpoints.
```

---

## Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run all checks**
   ```bash
   npm run lint
   npm test
   npm run build
   ```

3. **Push your changes**
   ```bash
   git push origin feature/your-feature-name
   ```

### Create Pull Request

1. **Go to GitHub** and create a new Pull Request
2. **Fill out the PR template** with:
   - Clear description of changes
   - Related issues (Fixes #123)
   - Type of change (Feature, Bug Fix, etc.)
   - Testing performed
   - Screenshots (if UI changes)

### PR Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #(issue number)

## Testing
Describe the testing performed:
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass locally
- [ ] No breaking changes
```

### Review Process

1. **Automated Checks**
   - CI/CD pipeline runs tests
   - Linting checks pass
   - Build succeeds

2. **Code Review**
   - At least one maintainer reviews
   - Changes are discussed if needed
   - Feedback is provided

3. **Approval and Merge**
   - PR is approved
   - Branch is merged to main
   - Feature branch is deleted

---

## Coding Standards

### TypeScript

```typescript
// Use explicit types
const getUserById = (id: string): Promise<User> => {
  // implementation
}

// Use interfaces for objects
interface Job {
  id: string
  vehicleInfo: string
  status: JobStatus
  createdAt: Date
}

// Use enums for constants
enum JobStatus {
  OPEN = 'OPEN',
  ACCEPTED = 'ACCEPTED',
  COMPLETED = 'COMPLETED',
}
```

### React Components

```typescript
// Use functional components
interface JobCardProps {
  job: Job
  onAccept: (jobId: string) => void
}

export const JobCard: React.FC<JobCardProps> = ({ job, onAccept }) => {
  return (
    <div className="job-card">
      {/* component content */}
    </div>
  )
}

// Export as default
export default JobCard
```

### API Routes

```typescript
// Use proper HTTP methods
export async function GET(request: Request) {
  try {
    // implementation
    return Response.json({ success: true, data: {} })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // validation
    // implementation
    return Response.json({ success: true, data: {} }, { status: 201 })
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 400 })
  }
}
```

### Styling

```typescript
// Use Tailwind CSS classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h2 className="text-lg font-bold text-gray-900">Title</h2>
  <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
    Action
  </button>
</div>

// Use custom CSS for complex styles
<div className="custom-component">
  {/* content */}
</div>

// styles.css
.custom-component {
  /* custom styles */
}
```

### Error Handling

```typescript
// Always handle errors
try {
  const result = await prisma.job.findUnique({ where: { id } })
  if (!result) {
    return Response.json({ success: false, error: 'Not found' }, { status: 404 })
  }
  return Response.json({ success: true, data: result })
} catch (error) {
  console.error('Error fetching job:', error)
  return Response.json({ success: false, error: 'Internal server error' }, { status: 500 })
}
```

### Comments and Documentation

```typescript
/**
 * Fetches a job by ID
 * @param jobId - The ID of the job to fetch
 * @returns Promise<Job> - The job object
 * @throws Error if job not found
 */
export const getJobById = async (jobId: string): Promise<Job> => {
  // implementation
}

// Use comments for complex logic
// Calculate total earnings by summing all completed job payments
const totalEarnings = payments
  .filter(p => p.status === 'COMPLETED')
  .reduce((sum, p) => sum + p.amount, 0)
```

---

## Testing Requirements

### Unit Tests

```typescript
describe('JobCard Component', () => {
  it('should render job information', () => {
    const job = { id: '1', vehicleInfo: 'Toyota Camry', status: 'OPEN' }
    render(<JobCard job={job} onAccept={() => {}} />)
    expect(screen.getByText('Toyota Camry')).toBeInTheDocument()
  })
})
```

### Integration Tests

```typescript
describe('Job API', () => {
  it('should create and retrieve a job', async () => {
    const response = await POST(createRequest)
    expect(response.status).toBe(201)
  })
})
```

### Test Coverage

- Minimum 80% code coverage
- All critical paths tested
- Edge cases covered
- Error scenarios tested

### Run Tests

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

## Documentation

### Update README

If your changes affect how to use the project, update `README.md`

### Update API Documentation

If you add/modify API endpoints, update `API_DOCUMENTATION.md`

### Add Code Comments

Document complex logic with comments:

```typescript
// Explain why, not what
// We need to sort by date descending to show newest jobs first
const sortedJobs = jobs.sort((a, b) => b.createdAt - a.createdAt)
```

### Update CHANGELOG

Add entry to `CHANGELOG.md`:

```markdown
## [1.2.0] - 2025-11-10

### Added
- Job filtering by status
- Driver search functionality

### Fixed
- Password validation bug
- Payment calculation error

### Changed
- Updated API response format
```

---

## Reporting Issues

### Bug Reports

Include:
- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots/logs
- Environment details

### Feature Requests

Include:
- Clear description of the feature
- Use case/motivation
- Proposed implementation (optional)
- Related issues

### Security Issues

**Do not** open a public issue for security vulnerabilities. Instead:
1. Email security@swaprunn.com
2. Include detailed description
3. Allow time for fix before disclosure

---

## Getting Help

- **Documentation**: https://docs.swaprunn.com
- **Issues**: https://github.com/swaprunn/swaprunn/issues
- **Discussions**: https://github.com/swaprunn/swaprunn/discussions
- **Email**: support@swaprunn.com

---

## Recognition

Contributors will be recognized in:
- CONTRIBUTORS.md file
- Release notes
- Project website

---

## License

By contributing to SwapRunn, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to SwapRunn! 🚀

Last Updated: November 10, 2025
