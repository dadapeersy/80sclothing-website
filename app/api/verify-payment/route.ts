import { NextResponse } from "next/server";
import crypto from "crypto";
import connectToDatabase from "@/lib/mongoose";
import { Order, Product } from "@/lib/models";

export async function POST(request: Request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderDetails
    } = await request.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // save to db
      await connectToDatabase();
      const newOrder = await Order.create({
        customerName: orderDetails.customerName,
        customerEmail: orderDetails.customerEmail,
        customerPhone: orderDetails.customerPhone,
        shippingAddress: orderDetails.shippingAddress,
        items: orderDetails.items,
        totalAmount: orderDetails.totalAmount,
        razorpayPaymentId: razorpay_payment_id,
        status: "Processing" // Booked status
      });
      
      // decrement stock
      for (const item of orderDetails.items) {
        await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
      }
      
      return NextResponse.json({ success: true, orderId: newOrder._id }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
  }
}
