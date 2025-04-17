import React from "react";
import Game from "./components/Game";
import Leaderboard from './components/Leaderboard';
import "./App.css"; // or your custom CSS

const App: React.FC = () => {
  return (
    <div className="App">
      <Game />
      <Leaderboard />
    </div>
  );
};

export default App;
