/**
 * GET /api/drivers
 * Fetches drivers with optional filtering by rating, location, or availability
 * Supports pagination and search
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const minRating = parseFloat(searchParams.get('minRating') || '0')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Build filter conditions
    const where: any = {}
    
    if (minRating > 0) {
      where.averageRating = { gte: minRating }
    }
    
    if (status) {
      where.status = status
    }

    if (search) {
      where.OR = [
        {
          user: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
        {
          location: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ]
    }

    // Fetch drivers with pagination
    const drivers = await prisma.driver.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        averageRating: 'desc',
      },
    })

    // Get total count for pagination
    const total = await prisma.driver.count({ where })

    return NextResponse.json(
      {
        success: true,
        data: drivers,
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
    console.error('Drivers fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
