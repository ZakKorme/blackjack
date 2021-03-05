import { useState } from "react";
import Title from "../../components/Title/Title";
import classes from "./Multiplayer.module.css";
import Table from "../../components/Table/Table";

const Multiplayer = (props) => {
  const [betPlayer1, setBetPlayer1] = useState(0);
  const [betPlayer2, setBetPlayer2] = useState(0);
  const [gameStart, setGameStart] = useState(false);

  const onBetHandlerPlayer1 = (e) => {
    e.preventDefault();
    setBetPlayer1(e.target.value);
  };

  const onBetHandlerPlayer2 = (e) => {
    e.preventDefault();
    setBetPlayer2(e.target.value);
  };

  const onGameStart = () => {
    setGameStart(
      <Table players={2} bet1={betPlayer1} bet2={betPlayer2} gameStart={true} />
    );
  };

  let game = (
    <div>
      <div
        style={{
          display: "inline-flex",
          justifyContent: "space-evenly",
          paddingLeft: "26%",
          paddingRight: "26%",
        }}
      >
        <div style={{ textAlign: "center", padding: "10%" }}>
          <h4> Player 1 : How much will you be playing with today?</h4>
          <input
            type="number"
            placeholder={"$"}
            onChange={onBetHandlerPlayer1}
          />
        </div>
        <div style={{ textAlign: "center", paddingTop: "10%" }}>
          <h4> Player 2 : How much will you be playing with today?</h4>
          <input
            type="number"
            placeholder={"$"}
            onChange={onBetHandlerPlayer2}
          />
        </div>
      </div>
      <div style={{ marginTop: "5%", marginLeft: "46%" }}>
        <button
          className={classes.Btn}
          disabled={betPlayer1 && betPlayer2 ? false : true}
          onClick={onGameStart}
        >
          <strong>We're Ready to Play</strong>
        </button>
      </div>
    </div>
  );
  return (
    <div>
      <Title title={"Multi-Player"} />
      {gameStart ? gameStart : game}
    </div>
  );
};

export default Multiplayer;
