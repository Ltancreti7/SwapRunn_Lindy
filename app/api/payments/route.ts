/**
 * GET /api/payments
 * Fetches payments with optional filtering by driver, status, or date range
 * Supports pagination
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const driverId = searchParams.get('driverId')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Build filter conditions
    const where: any = {}
    if (driverId) where.driverId = driverId
    if (status) where.status = status

    // Fetch payments with pagination
    const payments = await prisma.payment.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        driver: {
          select: {
            id: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        job: {
          select: {
            id: true,
            vehicleInfo: true,
            completedAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Get total count for pagination
    const total = await prisma.payment.count({ where })

    return NextResponse.json(
      {
        success: true,
        data: payments,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Payments fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
