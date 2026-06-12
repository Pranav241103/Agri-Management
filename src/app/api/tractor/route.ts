import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Tractor from "@/models/Tractor";

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

    const tractors =
      await Tractor.find({
        userId,
      }).sort({
        createdAt: -1,
      });

    return NextResponse.json(
      tractors
    );
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

    const tractor =
      await Tractor.create({
        userId: body.userId,

        ownerName:
          body.ownerName,

        tractorName:
          body.tractorName,

        tractorNumber:
          body.tractorNumber,

        serviceType:
          body.serviceType,

        serviceRate:
          Number(
            body.serviceRate
          ),

        contactNumber:
          body.contactNumber,

        status:
          body.status ||
          "Available",
      });

    return NextResponse.json(
      tractor
    );
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