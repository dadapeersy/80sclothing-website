import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongoose';
import { Order } from '@/lib/models';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get('status'); // 'active' or 'delivered'

    await connectToDatabase();
    
    let query = {};
    if (statusFilter === 'active') {
      query = { status: { $ne: 'Delivered' } };
    } else if (statusFilter === 'delivered') {
      query = { status: 'Delivered' };
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
