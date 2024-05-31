'use server'
import {Game} from "@/models/game";
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

