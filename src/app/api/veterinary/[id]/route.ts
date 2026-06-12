import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Veterinary from "@/models/Veterinary";

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

    await Veterinary.findByIdAndDelete(
      params.id
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Delete Failed",
      },
      {
        status: 500,
      }
    );
  }
}