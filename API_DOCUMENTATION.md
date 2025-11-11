# SwapRunn API Documentation

Complete API reference for the SwapRunn logistics platform.

## Base URL

```
https://swaprunn.com/api
```

## Authentication

All API requests require authentication via JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Response Format

All responses are returned in JSON format with the following structure:

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

---

## Authentication Endpoints

### POST /auth/signup

Register a new user account.

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "password": "securepassword123",
  "role": "DRIVER",
  "licenseNumber": "DL123456789",
  "licenseExpiry": "2026-12-31",
  "serviceRadius": 50
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-123",
    "name": "John Smith",
    "email": "john@example.com",
    "role": "DRIVER",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Status Codes:**
- `201`: User created successfully
- `400`: Invalid input or user already exists
- `500`: Server error

---

### POST /auth/login

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-123",
    "name": "John Smith",
    "email": "john@example.com",
    "role": "DRIVER",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Status Codes:**
- `200`: Login successful
- `401`: Invalid credentials
- `404`: User not found

---

### POST /auth/dealership-register

Register a new dealership.

**Request Body:**
```json
{
  "name": "Smith Auto Dealership",
  "address": "123 Main Street, New York, NY 10001",
  "contactEmail": "admin@smithauto.com",
  "phone": "(555) 123-4567",
  "adminName": "Jane Smith",
  "adminEmail": "jane@smithauto.com",
  "adminPassword": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "dealershipId": "dealership-123",
    "status": "PENDING",
    "message": "Dealership registration submitted for approval"
  }
}
```

**Status Codes:**
- `201`: Dealership registered
- `400`: Invalid input
- `409`: Dealership already exists

---

## Job Endpoints

### GET /jobs

Fetch jobs with optional filtering and pagination.

**Query Parameters:**
```
?status=OPEN&page=1&limit=10&search=Toyota&sortBy=createdAt&sortOrder=desc
```

**Supported Filters:**
- `status`: OPEN, ACCEPTED, IN_PROGRESS, COMPLETED, CANCELLED
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10)
- `search`: Search by vehicle info or location
- `sortBy`: createdAt, paymentAmount, status
- `sortOrder`: asc, desc

**Response:**
```json
{
  "success": true,
  "data": {
    "jobs": [
      {
        "id": "job-123",
        "vehicleInfo": "2024 Toyota Camry",
        "vin": "4T1BF1AK5CU123456",
        "pickupLocation": "123 Main St, New York, NY",
        "dropoffLocation": "456 Oak Ave, Boston, MA",
        "paymentAmount": 150,
        "status": "OPEN",
        "createdAt": "2025-11-10T14:30:00Z"
      }
    ],
    "total": 45,
    "page": 1,
    "limit": 10
  }
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized
- `500`: Server error

---

### POST /jobs/create

Create a new delivery job.

**Request Body:**
```json
{
  "vehicleInfo": "2024 Toyota Camry - Silver",
  "vin": "4T1BF1AK5CU123456",
  "pickupLocation": "123 Main St, New York, NY 10001",
  "dropoffLocation": "456 Oak Ave, Boston, MA 02101",
  "scheduledAt": "2025-11-15T10:00:00Z",
  "paymentAmount": 150,
  "notes": "Handle with care, new vehicle"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "job-123",
    "vehicleInfo": "2024 Toyota Camry - Silver",
    "vin": "4T1BF1AK5CU123456",
    "pickupLocation": "123 Main St, New York, NY 10001",
    "dropoffLocation": "456 Oak Ave, Boston, MA 02101",
    "paymentAmount": 150,
    "status": "OPEN",
    "createdAt": "2025-11-10T14:30:00Z"
  }
}
```

**Status Codes:**
- `201`: Job created
- `400`: Invalid input
- `401`: Unauthorized
- `500`: Server error

---

### POST /jobs/accept

Accept a job as a driver.

**Request Body:**
```json
{
  "jobId": "job-123",
  "driverId": "driver-456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "job-123",
    "status": "ACCEPTED",
    "driverId": "driver-456",
    "acceptedAt": "2025-11-10T15:00:00Z"
  }
}
```

**Status Codes:**
- `200`: Job accepted
- `400`: Job already accepted or invalid
- `401`: Unauthorized
- `404`: Job not found

---

### POST /jobs/complete

Mark a job as completed.

**Request Body:**
```json
{
  "jobId": "job-123",
  "notes": "Delivery completed successfully",
  "proofOfDelivery": "base64_encoded_image"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "job-123",
    "status": "COMPLETED",
    "completedAt": "2025-11-10T16:30:00Z",
    "paymentId": "payment-789"
  }
}
```

**Status Codes:**
- `200`: Job completed
- `400`: Invalid job status
- `401`: Unauthorized
- `404`: Job not found

---

## Driver Endpoints

### GET /drivers

Search and filter drivers.

**Query Parameters:**
```
?search=John&minRating=4.5&status=AVAILABLE&page=1&limit=10
```

**Supported Filters:**
- `search`: Search by name or location
- `minRating`: Minimum rating (0-5)
- `status`: AVAILABLE, BUSY, OFFLINE
- `page`: Page number
- `limit`: Results per page

**Response:**
```json
{
  "success": true,
  "data": {
    "drivers": [
      {
        "id": "driver-123",
        "name": "John Smith",
        "email": "john@example.com",
        "licenseNumber": "DL123456789",
        "serviceRadius": 50,
        "averageRating": 4.8,
        "completedJobs": 45,
        "status": "AVAILABLE",
        "location": "New York, NY"
      }
    ],
    "total": 12,
    "page": 1,
    "limit": 10
  }
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized

---

## Messaging Endpoints

### GET /messages

Fetch messages between two users.

**Query Parameters:**
```
?userId1=user-123&userId2=user-456&limit=50&offset=0
```

**Response:**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "msg-123",
        "senderId": "user-123",
        "recipientId": "user-456",
        "jobId": "job-789",
        "content": "I'm on my way",
        "createdAt": "2025-11-10T15:30:00Z"
      }
    ],
    "total": 25
  }
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized

---

### POST /messages

Send a message.

**Request Body:**
```json
{
  "senderId": "user-123",
  "recipientId": "user-456",
  "jobId": "job-789",
  "content": "I'm on my way to pickup"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "msg-123",
    "senderId": "user-123",
    "recipientId": "user-456",
    "jobId": "job-789",
    "content": "I'm on my way to pickup",
    "createdAt": "2025-11-10T15:30:00Z"
  }
}
```

**Status Codes:**
- `201`: Message sent
- `400`: Invalid input
- `401`: Unauthorized

---

## Rating Endpoints

### GET /ratings

Fetch ratings for a driver.

**Query Parameters:**
```
?driverId=driver-123&limit=10&page=1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "ratings": [
      {
        "id": "rating-123",
        "jobId": "job-456",
        "driverId": "driver-123",
        "rating": 5,
        "comment": "Excellent service!",
        "createdAt": "2025-11-10T16:00:00Z"
      }
    ],
    "averageRating": 4.8,
    "totalRatings": 45
  }
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized

---

### POST /ratings

Submit a rating for a driver.

**Request Body:**
```json
{
  "jobId": "job-123",
  "driverId": "driver-456",
  "rating": 5,
  "comment": "Great driver, very professional"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "rating-123",
    "jobId": "job-123",
    "driverId": "driver-456",
    "rating": 5,
    "comment": "Great driver, very professional",
    "createdAt": "2025-11-10T16:00:00Z"
  }
}
```

**Status Codes:**
- `201`: Rating submitted
- `400`: Invalid input or duplicate rating
- `401`: Unauthorized

---

## Payment Endpoints

### GET /payments

Fetch payment history.

**Query Parameters:**
```
?userId=user-123&status=COMPLETED&page=1&limit=10
```

**Supported Filters:**
- `userId`: User ID
- `status`: PENDING, COMPLETED, FAILED
- `page`: Page number
- `limit`: Results per page

**Response:**
```json
{
  "success": true,
  "data": {
    "payments": [
      {
        "id": "payment-123",
        "jobId": "job-456",
        "driverId": "driver-789",
        "amount": 150,
        "status": "COMPLETED",
        "type": "DELIVERY",
        "createdAt": "2025-11-10T16:00:00Z"
      }
    ],
    "total": 25,
    "totalAmount": 3750
  }
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized

---

## Dealership Endpoints

### GET /dealerships

Fetch dealerships with optional filtering.

**Query Parameters:**
```
?status=APPROVED&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": {
    "dealerships": [
      {
        "id": "dealership-123",
        "name": "Smith Auto Dealership",
        "address": "123 Main St, New York, NY",
        "contactEmail": "admin@smithauto.com",
        "phone": "(555) 123-4567",
        "status": "APPROVED",
        "createdAt": "2025-11-01T10:00:00Z"
      }
    ],
    "total": 5
  }
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized

---

### POST /dealerships/approve

Approve a dealership (Admin only).

**Request Body:**
```json
{
  "dealershipId": "dealership-123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "dealership-123",
    "status": "APPROVED",
    "approvedAt": "2025-11-10T14:00:00Z"
  }
}
```

**Status Codes:**
- `200`: Dealership approved
- `401`: Unauthorized (Admin only)
- `404`: Dealership not found

---

### POST /dealerships/reject

Reject a dealership (Admin only).

**Request Body:**
```json
{
  "dealershipId": "dealership-123",
  "reason": "Incomplete documentation"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "dealership-123",
    "status": "REJECTED",
    "reason": "Incomplete documentation",
    "rejectedAt": "2025-11-10T14:00:00Z"
  }
}
```

**Status Codes:**
- `200`: Dealership rejected
- `401`: Unauthorized (Admin only)
- `404`: Dealership not found

---

## User Endpoints

### GET /users/[id]

Fetch user profile information.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-123",
    "name": "John Smith",
    "email": "john@example.com",
    "role": "DRIVER",
    "createdAt": "2025-11-01T10:00:00Z",
    "profile": {
      "licenseNumber": "DL123456789",
      "serviceRadius": 50,
      "averageRating": 4.8,
      "completedJobs": 45
    }
  }
}
```

**Status Codes:**
- `200`: Success
- `401`: Unauthorized
- `404`: User not found

---

### PUT /users/[id]

Update user profile.

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "serviceRadius": 60
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-123",
    "name": "John Smith",
    "email": "john.smith@example.com",
    "updatedAt": "2025-11-10T14:00:00Z"
  }
}
```

**Status Codes:**
- `200`: Profile updated
- `400`: Invalid input
- `401`: Unauthorized
- `404`: User not found

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "INVALID_INPUT",
    "message": "Email is required",
    "details": {}
  }
}
```

### Common Error Codes

- `INVALID_INPUT`: Request validation failed
- `UNAUTHORIZED`: Missing or invalid authentication
- `FORBIDDEN`: User lacks required permissions
- `NOT_FOUND`: Resource not found
- `CONFLICT`: Resource already exists
- `INTERNAL_ERROR`: Server error

---

## Rate Limiting

API requests are rate limited to:
- **Authenticated users**: 1000 requests per hour
- **Unauthenticated users**: 100 requests per hour

Rate limit headers are included in all responses:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1699612800
```

---

## Webhooks

SwapRunn supports webhooks for real-time event notifications.

### Supported Events

- `job.created`: New job created
- `job.accepted`: Job accepted by driver
- `job.completed`: Job completed
- `payment.completed`: Payment processed
- `rating.submitted`: Driver rated

### Webhook Payload

```json
{
  "event": "job.completed",
  "timestamp": "2025-11-10T16:30:00Z",
  "data": {
    "jobId": "job-123",
    "status": "COMPLETED",
    "driverId": "driver-456"
  }
}
```

---

## SDK & Libraries

### JavaScript/TypeScript

```bash
npm install @swaprunn/sdk
```

```typescript
import { SwapRunn } from '@swaprunn/sdk'

const client = new SwapRunn({
  apiKey: 'your-api-key',
  baseUrl: 'https://swaprunn.com/api'
})

const jobs = await client.jobs.list()
```

### Python

```bash
pip install swaprunn
```

```python
from swaprunn import SwapRunn

client = SwapRunn(api_key='your-api-key')
jobs = client.jobs.list()
```

---

## Support

For API support, contact: api-support@swaprunn.com

Last Updated: November 10, 2025
