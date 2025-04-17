import React, { useEffect, useState } from 'react';

interface Score {
  playerName: string;
  score: number;
}

const Leaderboard: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch('/api/scores/leaderboard');
        const data = await response.json();
        setScores(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">🏆 Leaderboard</h2>
      <ul className="space-y-2">
        {scores.map((score, index) => (
          <li key={index} className="bg-white shadow-md p-3 rounded-md flex justify-between items-center">
            <span className="font-semibold">{index + 1}. {score.playerName}</span>
            <span className="text-blue-600 font-bold">{score.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
