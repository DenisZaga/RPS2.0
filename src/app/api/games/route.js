// import connectMongoDB from "@/lib/mongodb";
// import { Game } from "@/models/game";
// import { NextResponse } from "next/server";

// export default async function GET(request){
//     await connectMongoDB();
//     const games = await Game.find();
//     return NextResponse.json({games},{ status: 201})
// }

// export async function POST(request) {
//     const {name, players, result } = await request.json();
//     await connectMongoDB();
//     await Game.create({name, players, result});
//     return NextResponse.json({ message: "Game Created" }, { status: 201 });
// }

// export async function DELETE(request){
//     const id = request.nextUrl.searchParams.get("id")
//     await connectMongoDB();
//     await Game.findByIdAndDelete(id)
//     return NextResponse.json({message: "Game deleted"}, {status:200})
// }