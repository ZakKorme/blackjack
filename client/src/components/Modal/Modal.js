import { useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import numberWithCommas from "../../util/numberformat";
import classes from "./Modal.module.css";

Modal.setAppElement("#root");
const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "block",
  },
};

const ModalCustom = (props) => {
  const [bet, setBet] = useState(0);
  const [betError, setBetError] = useState(false);
  let modal = null;

  const validateBet = (e) => {
    let runningTotal = bet + Number(e.target.id);
    let playerAccount = Number(props.playerAccount);

    if (runningTotal > playerAccount) {
      setBetError(true);
      console.log("exceeded funds");
    } else {
      let temp = Number(e.target.id);
      if (temp === 5) {
        setBet(Number(bet + 5));
      } else if (temp === 10) {
        setBet(bet + 10);
      } else if (temp === 20) {
        setBet(bet + 20);
      } else if (temp === 50) {
        setBet(bet + 50);
      } else if (temp === 100) {
        setBet(bet + 100);
      }
      setBetError(false);
    }
  };

  if (props.round) {
    switch (props.round) {
      case "start":
        modal = (
          <Modal isOpen={props.showModal} style={modalStyle}>
            <h2>How much would you like to bet on this round?</h2>
            <p>
              <strong>Your funds are below:</strong>
            </p>
            <p>${numberWithCommas(props.playerAccount)}</p>
            <span id={5} className={classes.BetAmount5} onClick={validateBet}>
              $5
            </span>
            <span id={10} className={classes.BetAmount10} onClick={validateBet}>
              $10
            </span>
            <span id={20} className={classes.BetAmount20} onClick={validateBet}>
              $20
            </span>
            <span id={50} className={classes.BetAmount50} onClick={validateBet}>
              $50
            </span>
            <span
              id={100}
              className={classes.BetAmount100}
              onClick={validateBet}
            >
              $100
            </span>

            {/* <form className={classes.Form}>
              {/* <input
                type="number"
                placeholder={"$"}
                onChange={props.betHandler}
              /> */}
            {/* <button onClick={props.modalHandler}>Lets Play!</button>
              <button>Cancel</button> */}
            {/* </form>  */}
            <div className={classes.Form}>
              {betError ? (
                <span style={{ color: "red", display: "block" }}>
                  Insufficient Funds
                </span>
              ) : null}
              {bet ? (
                <span>
                  <strong>Bet:</strong> $
                </span>
              ) : null}
              <span>{bet ? numberWithCommas(bet) : null}</span>
              {bet ? (
                <button
                  className={classes.Btn}
                  onClick={() => {
                    setBet(0);
                    props.modalHandler(bet);
                  }}
                >
                  Lets play!
                </button>
              ) : null}
            </div>
          </Modal>
        );
        break;
      case "endgame-win":
        modal = (
          <Modal isOpen={props.showModal} style={modalStyle}>
            <h2>You've won!</h2>
            <p>We've added the following to your account</p>
            <p style={{ color: "green" }}>${props.betRound * 1.5}</p>
            <form>
              <button onClick={props.playAgainHandler}>Lets Play Again!</button>
              <Link to={"/"}>
                <button>End Game</button>
              </Link>
            </form>
          </Modal>
        );
        break;
      case "endgame-loss":
        modal = (
          <Modal isOpen={props.showModal} style={modalStyle}>
            <h2>You've lost...</h2>
            <p>We've deducted the following from your account</p>
            <p style={{ color: "red" }}>${props.betRound}</p>
            <form>
              <button onClick={props.playAgainHandler}>Lets Play Again!</button>
              <Link to={"/"}>
                <button>End Game</button>
              </Link>
            </form>
          </Modal>
        );
        break;
      case "out-of-money":
        modal = (
          <Modal isOpen={props.showModal} style={modalStyle}>
            <h2>Sorry, you've ran out of funds...</h2>
            <p>
              We'll redirect you if you want to add more money into your account
            </p>
            <p style={{ color: "red" }}>${props.playerAccount}</p>
            <form>
              <Link to={"/"}>
                <button>End Game</button>
              </Link>
            </form>
          </Modal>
        );
        break;
      default:
        return;
    }
  }

  return modal;
};

export default ModalCustom;
