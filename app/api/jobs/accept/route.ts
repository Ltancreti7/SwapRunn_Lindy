/**
 * POST /api/jobs/accept
 * Allows a driver to accept an open job
 * Updates job status to ACCEPTED and assigns driver
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { jobId, driverId } = body

    // Validate required fields
    if (!jobId || !driverId) {
      return NextResponse.json(
        { error: 'Missing required fields: jobId, driverId' },
        { status: 400 }
      )
    }

    // Check if job exists and is open
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    })

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    if (job.status !== 'OPEN') {
      return NextResponse.json(
        { error: `Job is not available. Current status: ${job.status}` },
        { status: 400 }
      )
    }

    // Update job to ACCEPTED and assign driver
    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        status: 'ACCEPTED',
        driverId,
        acceptedAt: new Date(),
      },
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
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Job accepted successfully',
        job: updatedJob,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Job acceptance error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
