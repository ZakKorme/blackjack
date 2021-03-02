import Dealer from "../Dealer/Dealer";
import Player from "../Player/Player";
import Deck from "../../util/deck";
import Card from "../Card/Card";
import classes from "./Table.module.css";
import { useState } from "react";
import ModalCustom from "../Modal/Modal";
import numberWithCommas from "../../util/numberformat";
import timeout from "../../util/timeout";

const Table = (props) => {
  const [dealerCards, setDealerCards] = useState([]);
  const [dealerBlackCard, setDealerBlackCard] = useState(true);
  const [dealerDeck, setDealerDeck] = useState(new Deck());

  const [playerCards, setPlayerCards] = useState([]);
  const [playerDeck, setPlayerDeck] = useState(new Deck());
  const [playerAccount, setPlayerAccount] = useState(props.bet1);

  const [player2Cards, setPlayer2Cards] = useState([]);
  const [player2Deck, setPlayer2Deck] = useState(new Deck());
  const [playerAccount2, setPlayerAccount2] = useState(props.bet2);

  const [disableBtn] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const [betRound, setBetRound] = useState(0);
  const [round, setRound] = useState("start");

  let players =
    props.players < 2 ? (
      <div style={{ paddingTop: "20px", textAlign: "center" }}>
        <Player playerNum={1} />
        {playerCards}
      </div>
    ) : (
      <div style={{ paddingTop: "100px" }}>
        <Player playerNum={1} />
        {playerCards}
        <Player playerNum={2} />
        {player2Cards}
      </div>
    );

  dealerDeck.shuffle();
  playerDeck.shuffle();
  player2Deck.shuffle();

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

  const hitHandler = async () => {
    let hitCard = playerDeck.deal();

    await setPlayerCards((playerCards) => [
      ...playerCards,
      <Card
        key={`player-${playerCards.length + 1} + ${hitCard[0]}`}
        suit={hitCard[0]}
        number={hitCard[1]}
        path={hitCard[2]}
      />,
    ]);
    let playerHand = countCards(playerCards) + hitCard[1];
    if (playerHand > 21) {
      setDealerBlackCard(false);
      await timeout(600);
      let losses = playerAccount - betRound;
      setPlayerAccount(losses);
      setRound("endgame-loss");
      setShowModal(!showModal);
      playerDeck.reset();
      playerDeck.shuffle();
      dealerDeck.reset();
      dealerDeck.shuffle();
    }
  };

  if (props.players > 1) {
    // Deal Player and Dealer hands
    if (
      playerCards.length < 2 &&
      player2Cards.length < 2 &&
      dealerCards.length < 1
    ) {
      // Cards - Player1
      for (let i = 0; i < 2; i++) {
        let temp = playerDeck.deal();
        setPlayerCards((playerCards) => [
          ...playerCards,
          <Card
            key={`player-${i} + ${temp[0]}`}
            suit={temp[0]}
            number={temp[1]}
            path={temp[2]}
          />,
        ]);
      }
      // Cards - Player2
      for (let i = 0; i < 2; i++) {
        let temp = player2Deck.deal();
        setPlayer2Cards((player2Cards) => [
          ...player2Cards,
          <Card
            key={`player-${i} + ${temp[0]}`}
            suit={temp[0]}
            number={temp[1]}
            path={temp[2]}
          />,
        ]);
      }

      // Cards - Dealer
      for (let i = 0; i < 2; i++) {
        let temp = dealerDeck.deal();
        setDealerCards((dealerCards) => [
          ...dealerCards,
          <Card
            back={i === 1 ? dealerBlackCard : false}
            key={`dealer-${i} + ${temp[0]}`}
            suit={temp[0]}
            number={temp[1]}
            path={temp[2]}
          />,
        ]);
      }
    }
  } else {
    // Deal Player and Dealer hands
    if (playerCards.length < 2 && dealerCards.length < 1) {
      // Cards - Player
      for (let i = 0; i < 2; i++) {
        let temp = playerDeck.deal();
        setPlayerCards((playerCards) => [
          ...playerCards,
          <Card
            key={`player-${i} + ${temp[0]}`}
            suit={temp[0]}
            number={temp[1]}
            path={temp[2]}
          />,
        ]);
      }

      // Cards - Dealer
      for (let i = 0; i < 2; i++) {
        let temp = dealerDeck.deal();
        setDealerCards((dealerCards) => [
          ...dealerCards,
          <Card
            back={i === 1 ? dealerBlackCard : false}
            key={`dealer-${i} + ${temp[0]}`}
            suit={temp[0]}
            number={temp[1]}
            path={temp[2]}
          />,
        ]);
      }
    }
  }

  const isWinner = async () => {
    let playerHand = countCards(playerCards);
    let dealerHand = countCards(dealerCards);

    //Show Dealer card

    if (playerHand > dealerHand && playerHand <= 21) {
      setDealerBlackCard(false);
      await timeout(600);

      let winnings = Number(playerAccount) + betRound * 1.5;
      setPlayerAccount(winnings);
      setRound("endgame-win");
      setShowModal(!showModal);

      playerDeck.reset();
      playerDeck.shuffle();
      dealerDeck.reset();
      dealerDeck.shuffle();
    } else {
      setDealerBlackCard(false);
      await timeout(600);

      let losses = Number(playerAccount) - betRound;
      setPlayerAccount(losses);
      setRound("endgame-loss");
      setShowModal(!showModal);

      playerDeck.reset();
      playerDeck.shuffle();
      dealerDeck.reset();
      dealerDeck.shuffle();
    }
  };

  const playAgainHandler = () => {
    if (playerAccount <= 0) {
      setRound("out-of-money");
      setBetRound(0);
      setShowModal(true);
    } else {
      setDealerBlackCard(true);
      setRound("start");
      setPlayerCards([]);
      setDealerCards([]);
      setBetRound(0);
      setShowModal(true);
    }
  };

  return (
    <div className={classes.Table}>
      <ModalCustom
        round={round}
        showModal={showModal}
        playerAccount={numberWithCommas(playerAccount)}
        betRound={betRound}
        betHandler={onBetModalHandler}
        modalHandler={modalHandler}
        playAgainHandler={playAgainHandler}
      />
      <Dealer />
      <div>
        {dealerCards && dealerBlackCard
          ? dealerCards
          : [
              dealerCards[0],
              <Card
                back={false}
                key={dealerCards[1].key}
                suit={dealerCards[1].props.suit}
                number={dealerCards[1].props.number}
                path={dealerCards[1].props.path}
              />,
            ]}
      </div>
      {players}
      {/* <div>{player2Cards ? player2Cards : null}</div> */}
      <h4 style={{ textAlign: "right", paddingTop: "50px" }}>
        Amount: ${numberWithCommas(playerAccount)} -- You've bet $
        {numberWithCommas(betRound)} this round
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
