import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const { name, email, password } = await request.json();
  await connectMongoDB();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  await User.create({ name, email, password: hashedPassword });

  return NextResponse.json({ message: "User Registered" }, { status: 201 });
}
