import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Tractor from "@/models/Tractor";

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    await connectDB();

    const userId =
      req.nextUrl.searchParams.get(
        "userId"
      );

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID required",
        },
        {
          status: 400,
        }
      );
    }

    const tractor =
      await Tractor.findOne({
        _id: params.id,
        userId,
      });

    if (!tractor) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Tractor not found",
        },
        {
          status: 404,
        }
      );
    }

    await Tractor.findByIdAndDelete(
      params.id
    );

    return NextResponse.json({
      success: true,
      message:
        "Tractor deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Delete failed",
      },
      {
        status: 500,
      }
    );
  }
}