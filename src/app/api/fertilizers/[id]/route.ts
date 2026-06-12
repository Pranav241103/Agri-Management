import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Fertilizer from "@/models/Fertilizer";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    await connectDB();

    await Fertilizer.findByIdAndDelete(
      params.id
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Delete Failed",
      },
      { status: 500 }
    );
  }
}