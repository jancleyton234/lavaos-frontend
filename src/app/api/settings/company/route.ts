import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.API_URL || 'http://213.136.70.2:4040';

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/settings/company`, { cache: 'no-store' });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const res = await fetch(`${BACKEND_URL}/settings/company`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
