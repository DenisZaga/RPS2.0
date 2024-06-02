
import React from 'react';
import Link from 'next/link';
import { getGames } from '@/lib/data';

export default async function GameList() {
    const games = await getGames();
    return (
        <div className='bg-gray-200'>
            <div className='max-w-4xl m-auto'>
                <div className="p-4 rounded-lg">
                    <p className="font-bold m-auto mt-0 mb-0 block">Available games:</p>
                    <ul className="flex flex-col-reverse gap-2">
                        {games.map((g) => (
                            <li key={g.id} className="flex items-center justify-between">
                                <div>{g.name}</div>
                                <Link href={`/gamePage/${g.id}`} className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2">Join</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div> 
        </div>
    );
}
