import Dealer from "../Dealer/Dealer";
import Player from "../Player/Player";
import Deck from "../../util/deck";
import Card from "../Card/Card";
import classes from "./Table.module.css";
import { useState } from "react";
import ModalCustom from "../Modal/Modal";
import SubTitle from "../SubTitle/SubTitle";
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
  const [playerEndGame, setPlayerEndGame] = useState(false);
  const [playerHasWon, setPlayerHasWon] = useState(false);

  const [player2Cards, setPlayer2Cards] = useState([]);
  const [player2Deck] = useState(new Deck());
  const [playerAccount2, setPlayerAccount2] = useState(props.bet2);
  const [player2EndGame, setPlayer2EndGame] = useState(false);
  const [player2HasWon, setPlayer2HasWon] = useState(false);

  const [disableBtn] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const [turn, setTurn] = useState(props.players > 1 ? "Player 1" : null);
  const [betRound, setBetRound] = useState(0);
  const [betRound2, setBetRound2] = useState(0);
  const [round, setRound] = useState(
    props.players < 2 ? "start" : "start-multiplayer"
  );

  const audio = new Audio(cardSound);
  const style = props.players > 1 ? classes.Table2 : classes.Table;
  const style2 = playerEndGame ? classes.EndGame : null;
  const style3 = player2EndGame ? classes.EndGame : null;

  let players =
    props.players < 2 ? (
      <div className={classes.Player}>
        <Player playerNum={1} />
        {playerCards}
      </div>
    ) : (
      <div style={{ display: "inline-flex" }}>
        <div>
          <Player playerNum={1} />
          <div
            style={{
              border: "1px solid",
              borderColor: "rgb(48, 145, 78)",
              borderRadius: "5px",
            }}
          >
            {playerCards}
          </div>
        </div>

        <div>
          <Player playerNum={2} />
          <div
            style={{
              border: "1px solid",
              borderColor: "rgb(48, 145, 78)",
              borderRadius: "5px",
            }}
          >
            {player2Cards}
          </div>
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

  const cardReset = () => {
    if (props.players > 1) {
      playerDeck.reset();
      playerDeck.shuffle();
      player2Deck.reset();
      player2Deck.shuffle();
      dealerDeck.reset();
      dealerDeck.shuffle();
    } else {
      playerDeck.reset();
      playerDeck.shuffle();
      dealerDeck.reset();
      dealerDeck.shuffle();
    }
  };

  const hitHandler = async () => {
    let hitCard = playerDeck.deal();
    let hitCard2 = player2Deck.deal();

    if (turn === "Player 1" && !playerEndGame) {
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
        await timeout(1200);
        let losses = playerAccount - betRound;
        setPlayerAccount(losses);
        setRound("endgame-loss-player1");
        setPlayerEndGame(true);
        setShowModal(!showModal);
        playerDeck.reset();
        playerDeck.shuffle();
      }
      if (!player2EndGame) setTurn("Player 2");
    } else if (turn && turn === "Player 2" && !player2EndGame) {
      await setPlayer2Cards((player2Cards) => [
        ...player2Cards,
        <Card
          key={`player-${player2Cards.length + 1} + ${hitCard2[0]}`}
          suit={hitCard2[0]}
          number={hitCard2[1]}
          path={hitCard2[2]}
          player={true}
        />,
      ]);
      audio.play();
      let playerHand = countCards(player2Cards) + hitCard2[1];
      if (playerHand > 21) {
        await timeout(1200);
        let losses = playerAccount2 - betRound2;
        setPlayerAccount2(losses);
        setRound("endgame-loss-player2");
        setPlayer2EndGame(true);
        setShowModal(!showModal);
        playerDeck.reset();
        playerDeck.shuffle();
      }
      if (!playerEndGame) setTurn("Player 1");
    } else {
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
    let player2Hand = countCards(player2Cards);
    let dealerHand = countCards(dealerCards);

    if (props.players > 1) {
      if (player2EndGame && !playerEndGame) {
        if (playerHand > dealerHand && playerHand <= 21) {
          setDealerBlackCard(false);
          await timeout(600);

          let winnings = Number(playerAccount) + betRound * 1.5;
          setPlayerAccount(winnings);
          setPlayerHasWon(true);
          setPlayerEndGame(true);
          setRound("endgame-win-player1");
          setShowModal(!showModal);

          cardReset();
        } else {
          setDealerBlackCard(false);
          await timeout(600);

          let losses = Number(playerAccount) - betRound;
          setPlayerAccount(losses);
          setPlayerEndGame(true);
          setRound("endgame-multiplayer-loss");
          setShowModal(!showModal);

          cardReset();
        }
      } else if (playerEndGame && !player2EndGame) {
        if (player2Hand > dealerHand && player2Hand <= 21) {
          setDealerBlackCard(false);
          await timeout(600);

          let winnings = Number(playerAccount2) + betRound2 * 1.5;
          setPlayerAccount2(winnings);
          setPlayer2HasWon(true);
          setPlayer2EndGame(true);
          setRound("endgame-win-player2");
          setShowModal(!showModal);

          cardReset();
        } else {
          setDealerBlackCard(false);
          await timeout(600);

          let losses = Number(playerAccount2) - betRound2;
          setPlayerAccount2(losses);
          setPlayer2EndGame(true);
          setRound("endgame-multiplayer-loss");
          setShowModal(!showModal);

          cardReset();
        }
      } else {
        switch (turn) {
          case "Player 1":
            if (playerHand > dealerHand && playerHand <= 21) {
              let winnings = Number(playerAccount) + betRound * 1.5;
              setPlayerAccount(winnings);
              setPlayerEndGame(true);
              setPlayerHasWon(true);
              setRound("endgame-win-player1");
              setShowModal(!showModal);
              setTurn("Player 2");
              playerDeck.reset();
              playerDeck.shuffle();
            } else {
              let losses = Number(playerAccount) - betRound;
              setPlayerAccount(losses);
              setPlayerEndGame(true);
              setRound("endgame-loss-player1");
              setShowModal(!showModal);
              setTurn("Player 2");
              playerDeck.reset();
              playerDeck.shuffle();
            }
            break;
          case "Player 2":
            if (player2Hand > dealerHand && player2Hand <= 21) {
              let winnings = Number(playerAccount2) + betRound2 * 1.5;
              setPlayerAccount2(winnings);
              setPlayer2EndGame(true);
              setPlayer2HasWon(true);
              setRound("endgame-win-player2");
              setShowModal(!showModal);
              setTurn("Player 1");
              player2Deck.reset();
              player2Deck.shuffle();
            } else {
              let losses = Number(playerAccount) - betRound2;
              setPlayerAccount2(losses);
              setPlayer2EndGame(true);
              setRound("endgame-loss-player2");
              setShowModal(!showModal);
              setTurn("Player 1");
              player2Deck.reset();
              player2Deck.shuffle();
            }
            break;
          default:
            return;
        }
      }
    } else {
      if (playerHand > dealerHand && playerHand <= 21) {
        setDealerBlackCard(false);
        await timeout(600);
        let winnings = Number(playerAccount) + betRound * 1.5;
        setPlayerAccount(winnings);
        setRound("endgame-win");
        setShowModal(!showModal);
        cardReset();
      } else {
        setDealerBlackCard(false);
        await timeout(600);
        let losses = Number(playerAccount) - betRound;
        setPlayerAccount(losses);
        setRound("endgame-loss");
        setShowModal(!showModal);
        cardReset();
      }
    }
  };
  const playAgainHandler = () => {
    if (playerAccount <= 0 || playerAccount2 <= 0) {
      setRound("out-of-money");
      setBetRound(0);
      setShowModal(true);
    } else if (props.players > 1) {
      setDealerBlackCard(true);
      setBetRound(0);
      setBetRound2(0);
      setPlayerHasWon(false);
      setPlayer2HasWon(false);
      setRound("start-multiplayer");
      setTurn("Player 1");
      setPlayerCards([]);
      setPlayer2Cards([]);
      setDealerCards([]);
      setPlayerEndGame(false);
      setPlayer2EndGame(false);
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
  const continueHandler = () => {
    if (playerEndGame && player2EndGame) {
      if (playerHasWon && player2HasWon) {
        setRound("endgame-win-multiplayer");
        setShowModal(true);
      } else if (!playerHasWon && player2HasWon) {
        setRound("endgame-win-multiplayer2");
        setShowModal(true);
      } else if (playerHasWon && !player2HasWon) {
        setRound("endgame-win-multiplayer1");
        setShowModal(true);
      } else {
        setRound("endgame-multiplayer-loss");
        setShowModal(true);
      }
    } else {
      setShowModal(!showModal);
    }
  };

  return (
    <div className={style}>
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
        continueHandler={continueHandler}
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
        {props.players > 1 ? (
          <h6
            style={{
              margin: "0px",
              fontSize: "15px",
              textAlign: "center",
              color: "rgb(240, 240, 240)",
            }}
          >
            Turn: {turn}
          </h6>
        ) : null}
        <Card deck={true} back={true} />
      </div>
      {players}
      <SubTitle
        players={props.players}
        playerAccount={playerAccount}
        playerAccount2={playerAccount2}
        betRound={betRound}
        betRound2={betRound2}
        style2={style2}
        style3={style3}
      />
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
