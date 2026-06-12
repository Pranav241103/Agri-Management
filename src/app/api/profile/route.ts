import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const {
      email,
      name,
      phone,
      gender,
      location,
    } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        {
          status: 400,
        }
      );
    }

    const updatedUser =
      await User.findOneAndUpdate(
        {
          email,
        },
        {
          name,
          phone,
          gender,
          location,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        gender: updatedUser.gender,
        location: updatedUser.location,
        profileImage:
          updatedUser.profileImage,
      },
    });
  } catch (error: any) {
    console.error(
      "PROFILE UPDATE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Profile update failed",
      },
      {
        status: 500,
      }
    );
  }
}