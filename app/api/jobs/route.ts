/**
 * GET /api/jobs
 * Fetches jobs with optional filtering by status, salesperson, or driver
 * Supports pagination
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const salespersonId = searchParams.get('salespersonId')
    const driverId = searchParams.get('driverId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Build filter conditions
    const where: any = {}
    if (status) where.status = status
    if (salespersonId) where.salespersonId = salespersonId
    if (driverId) where.driverId = driverId

    // Fetch jobs with pagination
    const jobs = await prisma.job.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        salesperson: {
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
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Get total count for pagination
    const total = await prisma.job.count({ where })

    return NextResponse.json(
      {
        success: true,
        data: jobs,
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
    console.error('Jobs fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
