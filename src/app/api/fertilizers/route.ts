import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Fertilizer from "@/models/Fertilizer";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const userId =
      req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json([]);
    }

    const fertilizers =
      await Fertilizer.find({
        userId,
      }).sort({
        createdAt: -1,
      });

    return NextResponse.json(fertilizers);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const fertilizer =
      await Fertilizer.create({
        userId: body.userId,

        fertilizerName:
          body.fertilizerName,

        fertilizerType:
          body.fertilizerType,

        companyName:
          body.companyName,

        rate: Number(body.rate),

        quantity: Number(
          body.quantity
        ),

        totalValue:
          Number(body.rate) *
          Number(body.quantity),
      });

    return NextResponse.json(
      fertilizer
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed" },
      { status: 500 }
    );
  }
}