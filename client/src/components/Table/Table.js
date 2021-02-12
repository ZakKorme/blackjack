import Dealer from "../Dealer/Dealer";
import Player from "../Player/Player";
import Deck from "../../util/deck";
import Card from "../Card/Card";
import classes from "./Table.module.css";
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");
const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Table = (props) => {
  const [dealerCards, setDealerCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);
  const [showModal, setShowModal] = useState(true);

  let players =
    props.players < 2 ? (
      <Player playerNum={1} />
    ) : (
      <div style={{ paddingTop: "100px" }}>
        <Player playerNum={1} />
        <Player playerNum={2} />
      </div>
    );
  let dealer = new Deck();
  let player1 = new Deck();
  dealer.shuffle();
  player1.shuffle();

  const hitHandler = () => {
    let hitCard = player1.deal();
    setPlayerCards((playerCards) => [
      ...playerCards,
      <Card
        key={`player-${playerCards.length + 1}`}
        suit={hitCard[0]}
        number={hitCard[1]}
      />,
    ]);
    let playerHand = countCards(playerCards);

    if (playerHand > 21) {
      console.log("Sorry, you lost..");
      setDisableBtn(true);
    }
  };

  // MODAL FUNCTIONS
  const modalHandler = (e) => {
    setShowModal(!showModal);
  };

  let modal = (
    <Modal isOpen={showModal} style={modalStyle}>
      <h2>How much would you like to bet on this round?</h2>
      <p>Your funds are below:</p>
      <p>${props.bet}</p>
      <form>
        <input placeholder={"$"} />
        <button onClick={modalHandler}>Lets Play!</button>
        <button>Cancel</button>
      </form>
    </Modal>
  );

  const countCards = (arr) => {
    let num = 0;
    arr.map((card) => (num += card.props.number));
    return num;
  };

  const isWinner = () => {
    let playerHand = countCards(playerCards);
    let dealerHand = countCards(dealerCards);

    if (playerHand > dealerHand && playerHand <= 21) {
      console.log("YOU WON!");
      console.log("player:", playerHand);
      console.log("dealer:", dealerHand);
      setDisableBtn(true);
    } else {
      console.log("Sorry, dealer won...");
      console.log("player:", playerHand);
      console.log("dealer:", dealerHand);
      setDisableBtn(true);
    }
  };

  if (playerCards.length < 2) {
    for (let i = 0; i < 2; i++) {
      let temp = player1.deal();
      setPlayerCards((playerCards) => [
        ...playerCards,
        <Card
          key={`player-${i} + ${temp[0]}`}
          suit={temp[0]}
          number={temp[1]}
        />,
      ]);
    }

    for (let i = 0; i < 2; i++) {
      let temp = dealer.deal();
      setDealerCards((dealerCards) => [
        ...dealerCards,
        <Card
          key={`dealer-${i} + ${temp[0]}`}
          suit={temp[0]}
          number={temp[1]}
        />,
      ]);
    }
  }

  return (
    <div className={classes.Table}>
      {modal}
      <Dealer />
      <div>{dealerCards}</div>
      {players}
      <div>{playerCards}</div>
      <h4 style={{ textAlign: "right" }}>Amount: ${props.bet}</h4>
      <button
        className={classes.Btn}
        onClick={hitHandler}
        disabled={disableBtn}
      >
        Hit
      </button>
      <button className={classes.Btn} onClick={isWinner} disabled={disableBtn}>
        Pass
      </button>
      <button onClick={modalHandler}>Show Modal</button>
    </div>
  );
};

export default Table;
