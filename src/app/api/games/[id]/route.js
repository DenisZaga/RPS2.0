import connectMongoDB from "@/lib/mongodb";
import Game from "@/models/game";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { newName: name, newResult: result, playersNames: { player1, player2 } } = await request.json();
    
    await connectMongoDB();
    await Game.findByIdAndUpdate(id, { name, result, players: [player1, player2] });
  
    return NextResponse.json({ message: "Game updated" }, { status: 200 });
  }

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const game = await Game.findOne({ _id: id });
  return NextResponse.json({ game }, { status: 200 });
}