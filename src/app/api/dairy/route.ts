import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Dairy from "@/models/Dairy";

export async function GET(
  req: NextRequest
) {
  try {
    await connectDB();

    const userId =
      req.nextUrl.searchParams.get(
        "userId"
      );

    if (!userId) {
      return NextResponse.json([]);
    }

    const records = await Dairy.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json(records);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Failed",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const body = await req.json();

    const dairy = await Dairy.create({
      userId: body.userId,

      milkType: body.milkType,

      litre: Number(body.litre),

      milkRate: Number(
        body.milkRate
      ),

      totalAmount:
        Number(body.litre) *
        Number(body.milkRate),

      date: new Date(body.date),
    });

    return NextResponse.json(dairy);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Failed",
      },
      {
        status: 500,
      }
    );
  }
}