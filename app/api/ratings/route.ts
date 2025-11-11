/**
 * POST /api/ratings
 * Allows users to rate drivers after job completion
 * Calculates and updates driver average rating
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { jobId, driverId, rating, comment } = body

    // Validate required fields
    if (!jobId || !driverId || rating === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: jobId, driverId, rating' },
        { status: 400 }
      )
    }

    // Validate rating is between 1 and 5
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Check if job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    })

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    // Check if driver exists
    const driver = await prisma.driver.findUnique({
      where: { id: driverId },
    })

    if (!driver) {
      return NextResponse.json(
        { error: 'Driver not found' },
        { status: 404 }
      )
    }

    // Create rating record
    const ratingRecord = await prisma.rating.create({
      data: {
        jobId,
        driverId,
        rating,
        comment: comment || null,
      },
    })

    // Calculate new average rating for driver
    const allRatings = await prisma.rating.findMany({
      where: { driverId },
    })

    const averageRating =
      allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length

    // Update driver's average rating
    await prisma.driver.update({
      where: { id: driverId },
      data: {
        averageRating,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Rating submitted successfully',
        data: {
          rating: ratingRecord,
          driverAverageRating: averageRating,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Rating creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/ratings
 * Fetches ratings for a specific driver
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const driverId = searchParams.get('driverId')

    if (!driverId) {
      return NextResponse.json(
        { error: 'Missing required parameter: driverId' },
        { status: 400 }
      )
    }

    const ratings = await prisma.rating.findMany({
      where: { driverId },
      include: {
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

    const averageRating =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
        : 0

    return NextResponse.json(
      {
        success: true,
        data: {
          ratings,
          averageRating,
          totalRatings: ratings.length,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Ratings fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
