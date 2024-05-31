// lib/action.js
'use client';
import connectMongoDB from "./mongodb";
import { Game } from "@/models/game";

export const createInitialgame = async (prevState, formData) => {
  const { name } = Object.fromEntries(formData);

  try {
    connectMongoDB();
    const newGame = new Game({
      name
    });

    await newGame.save().then(
      res => {console.log(res);}
    );
    console.log("saved to db");

  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};


// export const createInitialgame = async (prevState, formData) => {
//   const {name} = Object.fromEntries(formData);
//   await connectMongoDB();
//   const newGame = new Game(
//     {
//       name, 
//       players: [], 
//       result: ''
//     });

//   await newGame.save()
//   return NextResponse.json({ message: "Game Created" }, { status: 201 });
// }
