/**
 * POST /api/messages
 * Sends a message between users
 * Creates a new message record in the database
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { senderId, recipientId, jobId, content } = body

    // Validate required fields
    if (!senderId || !recipientId || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: senderId, recipientId, content' },
        { status: 400 }
      )
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        senderId,
        recipientId,
        jobId: jobId || null,
        content,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        recipient: {
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
        message: 'Message sent successfully',
        data: message,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Message creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/messages
 * Fetches messages between two users or for a specific job
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId1 = searchParams.get('userId1')
    const userId2 = searchParams.get('userId2')
    const jobId = searchParams.get('jobId')
    const limit = parseInt(searchParams.get('limit') || '50')

    let where: any = {}

    if (jobId) {
      where.jobId = jobId
    } else if (userId1 && userId2) {
      where = {
        OR: [
          { senderId: userId1, recipientId: userId2 },
          { senderId: userId2, recipientId: userId1 },
        ],
      }
    } else {
      return NextResponse.json(
        { error: 'Provide either jobId or both userId1 and userId2' },
        { status: 400 }
      )
    }

    const messages = await prisma.message.findMany({
      where,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        recipient: {
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
        data: messages.reverse(),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Messages fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
