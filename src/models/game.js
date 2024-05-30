import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  player: {
    type: Array,
    default: [],
  },
  result: {
    type: String,
    default: '',
  },
});

export const Game = mongoose.models?.Game || mongoose.model('Game', gameSchema);


// export const Game = mongoose.models?.Game || mongoose.model('Game', gameSchema);
