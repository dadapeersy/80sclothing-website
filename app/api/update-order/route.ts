import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { Order } from "@/lib/models";

export async function POST(request: Request) {
  try {
    const { orderId, status } = await request.json();
    await connectToDatabase();
    const updated = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
