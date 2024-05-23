import React from 'react';
import Link from 'next/link';

export const getGames = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/games", {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch topics");
      }
  
      return res.json();
    } catch (error) {
      console.log("Error loading topics: ", error);
    }
  };
  

export default async function GameList() {
    const { games } = await getGames();

    return (
      <>
        {games.map((g) => (
          <div
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">{g.name}</h2>
            </div>
  
            <div className="flex gap-2">
              <button id={g._id} className='w-8'/>
              <Link href={`/editTopic/${g._id}`}>
                
              </Link>
            </div>
          </div>
        ))}
      </>
    );
}

