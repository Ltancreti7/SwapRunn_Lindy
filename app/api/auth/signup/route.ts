/**
 * POST /api/auth/signup
 * Handles user signup for Salesperson and Driver roles
 * Creates user record and role-specific profile
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      email,
      password,
      name,
      phone,
      role,
      dealershipId,
      licenseNumber,
      radiusMiles,
    } = body

    // Validate required fields
    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        phone: phone || null,
        role,
      },
    })

    // Create role-specific profile
    if (role === 'SALESPERSON') {
      if (!dealershipId) {
        return NextResponse.json(
          { error: 'Dealership ID required for salesperson' },
          { status: 400 }
        )
      }

      await prisma.salesperson.create({
        data: {
          userId: user.id,
          dealershipId,
        },
      })
    } else if (role === 'DRIVER') {
      if (!licenseNumber || !radiusMiles) {
        return NextResponse.json(
          { error: 'License number and radius required for driver' },
          { status: 400 }
        )
      }

      await prisma.driver.create({
        data: {
          userId: user.id,
          licenseNumber,
          radiusMiles,
        },
      })
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
