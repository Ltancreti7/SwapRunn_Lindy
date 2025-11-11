/**
 * GET /api/users/[id]
 * Fetches user profile information
 * Returns user data with role-specific details
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id

    // Fetch user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        salesperson: {
          select: {
            id: true,
            dealership: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        driver: {
          select: {
            id: true,
            licenseNumber: true,
            serviceRadius: true,
            averageRating: true,
            completedJobs: true,
          },
        },
        dealership: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('User fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/users/[id]
 * Updates user profile information
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id
    const body = await request.json()
    const { name, email } = body

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'User updated successfully',
        data: updatedUser,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('User update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
