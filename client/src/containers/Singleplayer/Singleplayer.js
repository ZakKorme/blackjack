import { useState } from "react";
import Title from "../../components/Title/Title";
import Table from "../../components/Table/Table";
import classes from "./Singleplayer.module.css";
import Button from "../../components/Button/Button.js";

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
    <div style={{ textAlign: "center", paddingTop: "10%" }}>
      <h2>How much will you be playing with today?</h2>
      <input
        type="number"
        onChange={onBet}
        placeholder={"$"}
        className={classes.Input}
      />
      <button onClick={onGameStart} className={classes.Btn}>
        <strong>Lets play!</strong>
      </button>
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
