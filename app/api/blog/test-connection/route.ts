import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'

// Test MongoDB connection
export async function GET() {
  try {
    const db = await connectDB()
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful!',
      connectionState: db.connection.readyState === 1 ? 'connected' : 'disconnected',
      database: db.connection.db?.databaseName || 'unknown',
    }, { status: 200 })
  } catch (error: any) {
    console.error('MongoDB connection error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to connect to MongoDB',
      hint: 'Please check your MONGODB_URI in .env.local file',
    }, { status: 500 })
  }
}

