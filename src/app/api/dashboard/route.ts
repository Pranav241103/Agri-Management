import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const farmerCount = await User.countDocuments();

    return NextResponse.json({
      farmerCount,
    });
  } catch (error) {
    return NextResponse.json(
      {
        farmerCount: 0,
      },
      { status: 500 }
    );
  }
}