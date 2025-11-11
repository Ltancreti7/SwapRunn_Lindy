/**
 * POST /api/jobs/complete
 * Marks a job as completed
 * Updates job status to COMPLETED and records completion time
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { jobId, notes, proofOfDeliveryUrl } = body

    // Validate required fields
    if (!jobId) {
      return NextResponse.json(
        { error: 'Missing required field: jobId' },
        { status: 400 }
      )
    }

    // Check if job exists and is in progress
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    })

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      )
    }

    if (job.status !== 'IN_PROGRESS') {
      return NextResponse.json(
        { error: `Job cannot be completed. Current status: ${job.status}` },
        { status: 400 }
      )
    }

    // Update job to COMPLETED
    const completedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        notes: notes || job.notes,
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
      },
    })

    // Create payment record
    if (job.paymentAmount) {
      await prisma.payment.create({
        data: {
          jobId,
          driverId: job.driverId!,
          amount: job.paymentAmount,
          status: 'PENDING',
          type: 'JOB_COMPLETION',
        },
      })
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Job completed successfully',
        job: completedJob,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Job completion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
