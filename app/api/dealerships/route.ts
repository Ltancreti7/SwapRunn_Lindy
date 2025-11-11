/**
 * GET /api/dealerships
 * Fetches dealerships with optional filtering by status
 * Supports pagination
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Build filter conditions
    const where: any = {}
    if (status) where.status = status

    // Fetch dealerships with pagination
    const dealerships = await prisma.dealership.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        salespeople: {
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
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Get total count for pagination
    const total = await prisma.dealership.count({ where })

    return NextResponse.json(
      {
        success: true,
        data: dealerships,
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
    console.error('Dealerships fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
