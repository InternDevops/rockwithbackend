import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import { submitScore } from '../utils/api';

type Choice = "Rock" | "Paper" | "Scissors";

const choices: Choice[] = ["Rock", "Paper", "Scissors"];

const Game: React.FC = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  
  const [playerName, setPlayerName] = useState(""); // 🆕 ADDED
  const [gameOver, setGameOver] = useState(false);  // 🆕 ADDED
  const [nameSubmitted, setNameSubmitted] = useState(false); // 🆕 NEW state


  const playSound = (soundFile: string) => {
    const audio = new Audio(soundFile);
    audio.play().catch((e) => console.warn("Audio playback failed:", e));
  };

  const getIcon = (choice: Choice) => {
    switch (choice) {
      case "Rock":
        return <FaHandRock size={40} />;
      case "Paper":
        return <FaHandPaper size={40} />;
      case "Scissors":
        return <FaHandScissors size={40} />;
    }
  };

  const playGame = (choice: Choice) => {
    playSound("/sounds/click.mp3");

    const randomIndex = Math.floor(Math.random() * choices.length);
    const computerPick = choices[randomIndex];

    setPlayerChoice(choice);
    setComputerChoice(computerPick);

    if (choice === computerPick) {
      setResult("It's a Tie!");
      playSound("/sounds/tie.mp3");
    } else if (
      (choice === "Rock" && computerPick === "Scissors") ||
      (choice === "Paper" && computerPick === "Rock") ||
      (choice === "Scissors" && computerPick === "Paper")
    ) {
      setResult("You Win! 🎉");
      setPlayerScore((prev) => prev + 1);
      playSound("/sounds/win.mp3");
    } else {
      setResult("You Lose! 😢");
      setComputerScore((prev) => prev + 1);
      playSound("/sounds/lose.mp3");
    }

    setGameOver(true); // 🆕 ADDED
  };

  const handlePlayAgain = async () => {
    // 🆕 Submit score before resetting
    if (playerName.trim()) {
      await submitScore(playerName, playerScore);
    }

    // 🆕 Reset state
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("");
    setPlayerScore(0);
    setComputerScore(0);
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        Rock, Paper, Scissors
      </motion.h1>

      {/* 🆕 PLAYER NAME INPUT */}
      {/* 🆕 Player Name Input Flow */}
      {!nameSubmitted ? (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="px-3 py-2 border rounded"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button
            className="ml-2 px-3 py-2 bg-blue-500 text-white rounded"
            onClick={() => {
              if (playerName.trim()) {
                setNameSubmitted(true);
              }
            }}
          >
            Start Game
          </button>
        </div>
      ) : (
        <p className="mb-4 text-lg font-medium">👋 Welcome, <strong>{playerName}</strong></p>
      )}

      <div className="choices">
        {choices.map((name) => (
          <motion.button
            key={name}
            className="choice-btn"
            onClick={() => playGame(name)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={!nameSubmitted} // 🔥 Prevent playing without name
          >
            {getIcon(name)}
          </motion.button>
        ))}
      </div>

      {playerChoice && computerChoice && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="results"
        >
          <p>You chose: <strong>{playerChoice}</strong></p>
          <p>Computer chose: <strong>{computerChoice}</strong></p>
          <motion.h2 className="result"
            animate={{ scale: [0.8, 1.2, 1] }}
            transition={{ duration: 0.4 }}
          >
            {result}
          </motion.h2>
        </motion.div>
      )}

      <div className="scoreboard">
        <p>Player Score: {playerScore}</p>
        <p>Computer Score: {computerScore}</p>
      </div>

      {/* 🆕 PLAY AGAIN BUTTON */}
      {gameOver && (
        <motion.button
          className="reset-btn bg-green-500 text-white mt-4 px-4 py-2 rounded"
          onClick={handlePlayAgain}
          whileHover={{ scale: 1.1 }}
        >
          🔁 Play Again
        </motion.button>
      )}

      {/* 🔥 OLD reset removed and moved to Play Again flow */}
    </div>
  );
};

export default Game;
