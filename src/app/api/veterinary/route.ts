import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Veterinary from "@/models/Veterinary";

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

    const doctors =
      await Veterinary.find({
        userId,
      }).sort({
        createdAt: -1,
      });

    return NextResponse.json(
      doctors
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const body = await req.json();

    const doctor =
      await Veterinary.create({
        userId: body.userId,

        doctorName:
          body.doctorName,

        serviceName:
          body.serviceName,

        serviceRate: Number(
          body.serviceRate
        ),

        phoneNumber:
          body.phoneNumber,

        whatsappNumber:
          body.whatsappNumber,

        experience: Number(
          body.experience
        ),

        location:
          body.location,
      });

    return NextResponse.json(
      doctor
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed" },
      { status: 500 }
    );
  }
}