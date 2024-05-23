import mongoose, {Schema} from "mongoose";
import { stringify } from "postcss";

const gameSchema = new Schema(
    {
        name: String,
        players: [
            { type: String } 
        ],
        result: String,
    },
    {
        timestamps: true 
    }
);

const Game = mongoose.models.Game|| mongoose.model('Game', gameSchema);

export default Game;