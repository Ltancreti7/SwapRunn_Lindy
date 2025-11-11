/**
 * POST /api/dealerships/approve
 * Allows admin to approve a dealership registration
 * Updates dealership status to APPROVED
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { dealershipId } = body

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

    // Update dealership status to APPROVED
    const approvedDealership = await prisma.dealership.update({
      where: { id: dealershipId },
      data: {
        status: 'APPROVED',
        approvedAt: new Date(),
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
        message: 'Dealership approved successfully',
        dealership: approvedDealership,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Dealership approval error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
