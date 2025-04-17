// routes/scores.ts
import express from 'express';
import Score from '../models/Score'; // your mongoose model

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { playerName, score } = req.body;
    const newScore = new Score({ playerName, score });
    await newScore.save();
    res.status(201).json(newScore);
  } catch (err) {
    console.error("Error saving score:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
