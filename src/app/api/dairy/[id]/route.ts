import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Dairy from "@/models/Dairy";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const body = await req.json();

  const updated =
    await Dairy.findByIdAndUpdate(
      params.id,
      {
        milkType: body.milkType,
        litre: body.litre,
        milkRate: body.milkRate,
        totalAmount:
          body.litre * body.milkRate,
      },
      { new: true }
    );

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  await Dairy.findByIdAndDelete(
    params.id
  );

  return NextResponse.json({
    success: true,
  });
}