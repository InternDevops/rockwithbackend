import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  playerChoice: String,
  computerChoice: String,
  result: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Game", gameSchema);
