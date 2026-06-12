import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    console.log("🔥 Signup API Called");

    const body = await req.json();
    console.log("📦 Body:", body);

    const {
  name,
  email,
  password,
  phone,
  gender,
  location,
} = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

console.log("SAVING USER:", {
  name,
  email,
  phone,
  gender,
  location,
});

const user = await User.create({
  name,
  email,
  password: hashedPassword,
  phone,
  gender,
  location,
});

console.log("USER CREATED:", user);

    console.log("✅ User Created:", user.email);

    return NextResponse.json(
      {
        success: true,
        message: "Signup successful",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Signup Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}