/**
 * POST /api/jobs/create
 * Handles job creation by salespeople
 * Creates a new job record with OPEN status
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      vehicleInfo,
      vin,
      pickupLocation,
      dropoffLocation,
      scheduledAt,
      paymentAmount,
      notes,
    } = body

    // Validate required fields
    if (!vehicleInfo || !pickupLocation || !dropoffLocation || !paymentAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create job
    const job = await prisma.job.create({
      data: {
        vehicleInfo,
        vin: vin || null,
        pickupLocation,
        dropoffLocation,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        paymentAmount,
        notes: notes || null,
        status: 'OPEN',
        // In production, get userId from session/auth
        salespersonId: '1', // Placeholder
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Job created successfully',
        job: {
          id: job.id,
          vehicleInfo: job.vehicleInfo,
          status: job.status,
          paymentAmount: job.paymentAmount,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Job creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
