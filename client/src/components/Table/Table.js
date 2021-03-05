import Dealer from "../Dealer/Dealer";
import Player from "../Player/Player";
import Deck from "../../util/deck";
import Card from "../Card/Card";
import classes from "./Table.module.css";
import { useState } from "react";
import ModalCustom from "../Modal/Modal";
import numberWithCommas from "../../util/numberformat";
import timeout from "../../util/timeout";
import cardSound from "../../assets/240777__f4ngy__dealing-card.wav";

const Table = (props) => {
  const [dealerCards, setDealerCards] = useState([]);
  const [dealerBlackCard, setDealerBlackCard] = useState(true);
  const [dealerDeck] = useState(new Deck());

  const [playerCards, setPlayerCards] = useState([]);
  const [playerDeck] = useState(new Deck());
  const [playerAccount, setPlayerAccount] = useState(props.bet1);

  const [player2Cards, setPlayer2Cards] = useState([]);
  const [player2Deck] = useState(new Deck());
  const [playerAccount2, setPlayerAccount2] = useState(props.bet2);

  const [disableBtn] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const [betRound, setBetRound] = useState(0);
  const [betRound2, setBetRound2] = useState(0);
  const [round, setRound] = useState(
    props.players < 2 ? "start" : "start-multiplayer"
  );

  const audio = new Audio(cardSound);

  let players =
    props.players < 2 ? (
      <div className={classes.Player}>
        <Player playerNum={1} />
        {playerCards}
      </div>
    ) : (
      <div style={{ display: "inline-flex" }}>
        <div
        // style={{ transform: "skew(10deg, 0.5deg)", paddingRight: "100px" }}
        >
          <Player playerNum={1} />
          {playerCards}
        </div>

        <div
        // style={{ transform: "skew(0.5deg, 10deg)", paddingRight: "100px" }}
        >
          <Player playerNum={2} />
          {player2Cards}
        </div>
      </div>
    );

  dealerDeck.shuffle();
  playerDeck.shuffle();
  player2Deck.shuffle();

  // MODAL FUNCTIONS
  const modalHandler = (bet, bet2) => {
    setBetRound(bet);
    setBetRound2(bet2);

    setShowModal(!showModal);
  };

  const onBetModalHandler = (value) => {
    console.log(value);
    setBetRound(value);
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
        player={true}
      />,
    ]);
    audio.play();
    let playerHand = countCards(playerCards) + hitCard[1];
    if (playerHand > 21) {
      setDealerBlackCard(false);
      await timeout(1200);
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
      if (betRound && betRound2) {
        for (let i = 0; i < 2; i++) {
          let temp = playerDeck.deal();
          setPlayerCards((playerCards) => [
            ...playerCards,
            <Card
              key={`player-${i} + ${temp[0]}`}
              suit={temp[0]}
              number={temp[1]}
              path={temp[2]}
              player={true}
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
              player={true}
            />,
          ]);
          audio.play();
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
          audio.play();
        }
      }
    }
  } else {
    if (betRound) {
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
              player={true}
            />,
          ]);
          audio.play();
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
          audio.play();
        }
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
        playerAccount={playerAccount}
        playerAccount2={playerAccount2}
        betRound={betRound}
        betRound2={betRound2}
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
      <div className={classes.Deck}>
        <Card deck={true} back={true} />
      </div>
      {players}
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
