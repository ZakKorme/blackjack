import Dealer from "../Dealer/Dealer";
import Player from "../Player/Player";
import Deck from "../../util/deck";
import Card from "../Card/Card";
import classes from "./Table.module.css";
import { useState } from "react";
import ModalCustom from "../Modal/Modal";

const Table = (props) => {
  const [dealerCards, setDealerCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [playerAccount, setPlayerAccount] = useState(props.bet);
  const [betRound, setBetRound] = useState(0);
  const [round, setRound] = useState("start");

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

  // MODAL FUNCTIONS
  const modalHandler = () => {
    setShowModal(!showModal);
  };

  const onBetModalHandler = (e) => {
    e.preventDefault();
    setBetRound(e.target.value);
  };

  // GAME HANDLERS
  const countCards = (arr) => {
    let num = 0;
    arr.map((card) => (num += card.props.number));
    return num;
  };

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
      let losses = playerAccount - betRound;
      setPlayerAccount(losses);
      setPlayerCards([]);
      setDealerCards([]);
      setRound("endgame-loss");
      setShowModal(!showModal);
    }
  };
  // Deal Player and Dealer hands
  if (playerCards.length < 2 && dealerCards.length < 1) {
    // Cards - Player
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

    // Cards - Dealer
    for (let i = 0; i < 2; i++) {
      let temp = dealer.deal();
      if (i === 1) {
        setDealerCards((dealerCards) => [
          ...dealerCards,
          <Card
            back={true}
            key={`dealer-${i} + ${temp[0]}`}
            suit={temp[0]}
            number={temp[1]}
          />,
        ]);
        break;
      }
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

  const isWinner = () => {
    let playerHand = countCards(playerCards);
    let dealerHand = countCards(dealerCards);

    if (playerHand > dealerHand && playerHand <= 21) {
      let winnings = Number(playerAccount) + betRound * 1.5;

      setPlayerAccount(winnings);
      setPlayerCards([]);
      setDealerCards([]);
      setRound("endgame-win");
      setShowModal(!showModal);
    } else {
      let losses = playerAccount - betRound;
      setPlayerAccount(losses);
      setPlayerCards([]);
      setDealerCards([]);
      setRound("endgame-loss");
      setShowModal(!showModal);
    }
  };

  const playAgainHandler = () => {
    setRound("start");
    setBetRound(0);
    setShowModal(true);
  };

  return (
    <div className={classes.Table}>
      <ModalCustom
        round={round}
        showModal={showModal}
        playerAccount={playerAccount}
        betRound={betRound}
        betHandler={onBetModalHandler}
        modalHandler={modalHandler}
        playAgainHandler={playAgainHandler}
      />
      <Dealer />
      <div>{dealerCards}</div>
      {players}
      <div>{playerCards}</div>
      <h4 style={{ textAlign: "right" }}>
        Amount: ${playerAccount} -- You've bet ${betRound} this round
      </h4>
      <button
        className={classes.Btn}
        onClick={hitHandler}
        disabled={disableBtn}
      >
        Hit
      </button>
      <button className={classes.Btn} onClick={isWinner} disabled={disableBtn}>
        Stand
      </button>
    </div>
  );
};

export default Table;
