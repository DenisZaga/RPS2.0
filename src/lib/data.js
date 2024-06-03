'use server'
import {Game} from "@/models/game";
import User from "@/models/user";
import connectMongoDB from "./mongodb";
import { unstable_noStore as noStore } from "next/cache";


export const getGames = async () => {
  noStore();
    try {
      connectMongoDB();
      const games = await Game.find();
      return games;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch game!");
    }
};

export const updateGameInDatabase = async (gameId, players, result) => {
  try {
    await Game.findByIdAndUpdate(
      gameId,
      { player: players, result: result },
      { new: true }
    );
    console.log(`Game ${gameId} updated successfully`);
  } catch (error) {
    console.log(`Error updating game ${gameId}:`, error);
  }
};

export const getRandomGame = async () => {
  noStore();
    try {
      connectMongoDB();
      const games = await Game.find();
      const randomIndex = Math.floor(Math.random() * games.length);
      return games[randomIndex];
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch game!");
    }

}

export const getUser = async (id) => {
    noStore();
    try {
      connectMongoDB();
      const user = await User.findById(id);
      return user;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch user!");
    }
};
