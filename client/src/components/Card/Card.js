import classes from "./Card.module.css";

import spades from "../../assets/spade.svg";
import clubs from "../../assets/club.svg";
import diamond from "../../assets/diamond.svg";
import hearts from "../../assets/heart.svg";

const Card = (props) => {
  let style = props.back ? classes.Back : classes.Card;
  let suit = null;

  if (props.suit) {
    switch (props.suit) {
      case "spades":
        if (props.back) break;
        suit = <img src={spades} alt="spades" />;
        break;
      case "clubs":
        if (props.back) break;
        suit = <img src={clubs} alt="clubs" />;
        break;
      case "diamond":
        if (props.back) break;
        suit = <img src={diamond} alt="diamond" />;
        break;
      case "hearts":
        if (props.back) break;
        suit = <img src={hearts} alt="hearts" />;
        break;
      default:
        return;
    }
  }

  return (
    <div className={style}>
      <span className={classes.Rank}>
        <strong>{props.number}</strong>
      </span>
      <br />
      <span className={classes.Suit}>{suit}</span>
    </div>
  );
};

export default Card;
