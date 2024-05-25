'use client'
import React, { useState } from 'react';
import { getGames } from './GameList';


export default function CreateGame({ updateGames }) {
    const [gameName, setGameName] = useState('');

    const handleAddGame = async () => {
        getGames()
        if (!gameName.trim()) return; 
        try {
            const response = await fetch('/api/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: gameName }),
            });
            if (response.ok) {
                setGameName('');
                getGames(); 
            } else {
                console.error('Failed to add game');
            }
        } catch (error) {
            console.error('Error adding game:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center  bg-gray-200 p-6">
            <h1 className="text-2xl font-bold mb-6">Add New Game</h1>
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    placeholder="Enter game name"
                    className="p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <button
                    onClick={()=> {
                        handleAddGame()
                        getGames()
                    }}
                    className="bg-green-500 text-white p-2 rounded-r-lg hover:bg-green-600"
                >
                    Add
                </button>
            </div>
        </div>
    );
}
