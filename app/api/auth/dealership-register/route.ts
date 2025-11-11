/**
 * POST /api/auth/dealership-register
 * Handles dealership registration
 * Creates dealership record and auto-creates admin user
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      dealershipName,
      address,
      contactEmail,
      phone,
      contactPersonName,
      contactPersonTitle,
      adminPassword,
    } = body

    // Validate required fields
    if (!dealershipName || !address || !contactEmail || !adminPassword) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: contactEmail },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(adminPassword, 10)

    // Create admin user
    const adminUser = await prisma.user.create({
      data: {
        email: contactEmail,
        passwordHash,
        name: contactPersonName,
        phone: phone || null,
        role: 'DEALERSHIP_ADMIN',
      },
    })

    // Create dealership
    const dealership = await prisma.dealership.create({
      data: {
        name: dealershipName,
        address,
        contactEmail,
        phone: phone || null,
        adminId: adminUser.id,
        approved: false, // Requires SwapRunn admin approval
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Dealership registered successfully. Awaiting approval.',
        dealership: {
          id: dealership.id,
          name: dealership.name,
          approved: dealership.approved,
        },
        admin: {
          id: adminUser.id,
          email: adminUser.email,
          name: adminUser.name,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Dealership registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
