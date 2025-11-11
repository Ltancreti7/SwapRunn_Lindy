/**
 * POST /api/dealerships/reject
 * Allows admin to reject a dealership registration
 * Updates dealership status to REJECTED with reason
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { dealershipId, reason } = body

    // Validate required fields
    if (!dealershipId) {
      return NextResponse.json(
        { error: 'Missing required field: dealershipId' },
        { status: 400 }
      )
    }

    // Check if dealership exists
    const dealership = await prisma.dealership.findUnique({
      where: { id: dealershipId },
    })

    if (!dealership) {
      return NextResponse.json(
        { error: 'Dealership not found' },
        { status: 404 }
      )
    }

    // Update dealership status to REJECTED
    const rejectedDealership = await prisma.dealership.update({
      where: { id: dealershipId },
      data: {
        status: 'REJECTED',
        rejectionReason: reason || null,
      },
      include: {
        admin: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Dealership rejected successfully',
        dealership: rejectedDealership,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Dealership rejection error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
