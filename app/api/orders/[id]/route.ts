import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import { Order } from '@/lib/models';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const body = await request.json();
    await connectToDatabase();
    
    const updatedOrder = await Order.findByIdAndUpdate(
      resolvedParams.id,
      { status: body.status, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!updatedOrder) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
