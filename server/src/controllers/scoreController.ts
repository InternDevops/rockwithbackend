import { Request, Response } from 'express';
import Score from '../models/Score';

export const saveGameResult = async (req: Request, res: Response) => {
  try {
    const { playerChoice, computerChoice, result } = req.body;
    const newGame = new Score({ playerChoice, computerChoice, result });
    await newGame.save();
    res.status(201).json(newGame);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save game result' });
  }
};

export const getGameHistory = async (_: Request, res: Response) => {
  try {
    const history = await Score.find().sort({ date: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};
