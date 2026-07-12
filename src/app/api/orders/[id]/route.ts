import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const { id } = params;
  try {
    const response = await fetch(`http://37.60.227.236:4040/orders/${id}?t=${Date.now()}`, { cache: 'no-store' });
    
    if (!response.ok) {
      return NextResponse.json({ success: false, message: 'Falha ao buscar OS na VPS' }, { status: response.status });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
