import { useState } from "react";
import Title from "../../components/Title/Title";
import Table from "../../components/Table/Table";

const Singleplayer = (props) => {
  const [bet, setBet] = useState(0);
  const [gameStart, setGameStart] = useState(false);

  const onBet = (event) => {
    event.preventDefault();
    setBet(event.target.value);
  };

  const onGameStart = () => {
    if (!bet) return console.log("You must bet first!");
    setGameStart(<Table players={1} bet={bet} gameStart={true} />);
  };

  let game = (
    <div style={{ "text-align": "center", paddingTop: "10%" }}>
      <h2>How much will you be playing with today?</h2>
      <input type="number" onChange={onBet} placeholder={"$"} />
      <button onClick={onGameStart}>Lets play!</button>
    </div>
  );

  return (
    <div>
      <Title title={"Single-Player"} />
      {gameStart ? gameStart : game}
    </div>
  );
};

export default Singleplayer;
