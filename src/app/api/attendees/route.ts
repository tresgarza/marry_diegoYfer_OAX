import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { attendees } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;
    
    // Validate required fields
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ 
        error: 'Name is required and must be a string',
        code: 'MISSING_NAME'
      }, { status: 400 });
    }
    
    const trimmedName = name.trim();
    
    if (trimmedName.length === 0) {
      return NextResponse.json({ 
        error: 'Name cannot be empty',
        code: 'EMPTY_NAME'
      }, { status: 400 });
    }
    
    if (trimmedName.length > 255) {
      return NextResponse.json({ 
        error: 'Name must be 255 characters or less',
        code: 'NAME_TOO_LONG'
      }, { status: 400 });
    }
    
    // Get headers
    const userAgent = request.headers.get('user-agent') || null;
    const referrer = request.headers.get('referer') || null;
    const authorization = request.headers.get('authorization');
    
    // Log authorization header if present (don't enforce)
    if (authorization) {
      console.log('Authorization header present:', authorization.substring(0, 20) + '...');
    }
    
    // Create attendee
    const newAttendee = await db.insert(attendees)
      .values({
        name: trimmedName,
        source: 'wedding_hero',
        userAgent,
        referrer,
        createdAt: new Date().toISOString()
      })
      .returning();
    
    return NextResponse.json({
      id: newAttendee[0].id,
      name: newAttendee[0].name,
      created_at: newAttendee[0].createdAt
    }, { status: 201 });
    
  } catch (error) {
    console.error('POST /api/attendees error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limitParam = searchParams.get('limit');
    
    // Parse limit with max 500
    let limit = parseInt(limitParam || '100');
    if (isNaN(limit) || limit <= 0) {
      limit = 100;
    } else if (limit > 500) {
      limit = 500;
    }
    
    // Get attendees ordered by created_at desc
    const attendeesList = await db
      .select({
        id: attendees.id,
        name: attendees.name,
        source: attendees.source,
        created_at: attendees.createdAt
      })
      .from(attendees)
      .orderBy(desc(attendees.createdAt))
      .limit(limit);
    
    return NextResponse.json(attendeesList, { status: 200 });
    
  } catch (error) {
    console.error('GET /api/attendees error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}