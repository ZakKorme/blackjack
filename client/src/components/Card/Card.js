import classes from "./Card.module.css";
import frontCard from "../../assets/Cards/cardBack_blue.png";
import classNames from "classnames";

import clubs02 from "../../assets/Cards/card_clubs_02.png";
import clubs03 from "../../assets/Cards/card_clubs_03.png";
import clubs04 from "../../assets/Cards/card_clubs_04.png";
import clubs05 from "../../assets/Cards/card_clubs_05.png";
import clubs06 from "../../assets/Cards/card_clubs_06.png";
import clubs07 from "../../assets/Cards/card_clubs_07.png";
import clubs08 from "../../assets/Cards/card_clubs_08.png";
import clubs09 from "../../assets/Cards/card_clubs_09.png";
import clubs10 from "../../assets/Cards/card_clubs_10.png";
import clubsJ from "../../assets/Cards/card_clubs_J.png";
import clubsQ from "../../assets/Cards/card_clubs_Q.png";
import clubsK from "../../assets/Cards/card_clubs_K.png";
import clubsA from "../../assets/Cards/card_clubs_A.png";

import spades02 from "../../assets/Cards/card_spades_02.png";
import spades03 from "../../assets/Cards/card_spades_03.png";
import spades04 from "../../assets/Cards/card_spades_04.png";
import spades05 from "../../assets/Cards/card_spades_05.png";
import spades06 from "../../assets/Cards/card_spades_06.png";
import spades07 from "../../assets/Cards/card_spades_07.png";
import spades08 from "../../assets/Cards/card_spades_08.png";
import spades09 from "../../assets/Cards/card_spades_09.png";
import spades10 from "../../assets/Cards/card_spades_10.png";
import spadesJ from "../../assets/Cards/card_spades_J.png";
import spadesQ from "../../assets/Cards/card_spades_Q.png";
import spadesK from "../../assets/Cards/card_spades_K.png";
import spadesA from "../../assets/Cards/card_spades_A.png";

import diamonds02 from "../../assets/Cards/card_diamonds_02.png";
import diamonds03 from "../../assets/Cards/card_diamonds_03.png";
import diamonds04 from "../../assets/Cards/card_diamonds_04.png";
import diamonds05 from "../../assets/Cards/card_diamonds_05.png";
import diamonds06 from "../../assets/Cards/card_diamonds_06.png";
import diamonds07 from "../../assets/Cards/card_diamonds_07.png";
import diamonds08 from "../../assets/Cards/card_diamonds_08.png";
import diamonds09 from "../../assets/Cards/card_diamonds_09.png";
import diamonds10 from "../../assets/Cards/card_diamonds_10.png";
import diamondsJ from "../../assets/Cards/card_diamonds_J.png";
import diamondsQ from "../../assets/Cards/card_diamonds_Q.png";
import diamondsK from "../../assets/Cards/card_diamonds_K.png";
import diamondsA from "../../assets/Cards/card_diamonds_A.png";

import hearts02 from "../../assets/Cards/card_hearts_02.png";
import hearts03 from "../../assets/Cards/card_hearts_03.png";
import hearts04 from "../../assets/Cards/card_hearts_04.png";
import hearts05 from "../../assets/Cards/card_hearts_05.png";
import hearts06 from "../../assets/Cards/card_hearts_06.png";
import hearts07 from "../../assets/Cards/card_hearts_07.png";
import hearts08 from "../../assets/Cards/card_hearts_08.png";
import hearts09 from "../../assets/Cards/card_hearts_09.png";
import hearts10 from "../../assets/Cards/card_hearts_10.png";
import heartsJ from "../../assets/Cards/card_hearts_J.png";
import heartsQ from "../../assets/Cards/card_hearts_Q.png";
import heartsK from "../../assets/Cards/card_hearts_K.png";
import heartsA from "../../assets/Cards/card_hearts_A.png";

const Card = (props) => {
  let suit = null;
  let animationClasses = props.player
    ? classes.playerAnimation
    : props.deck
    ? null
    : classes.dealerAnimation;
  let cardType = props.path ? props.path.split(" ")[0] : null;

  if (props.suit) {
    switch (props.suit) {
      case "clubs":
        switch (cardType) {
          case "2":
            suit = <img src={clubs02} alt="clubs" />;
            break;
          case "3":
            suit = <img src={clubs03} alt="clubs" />;
            break;
          case "4":
            suit = <img src={clubs04} alt="clubs" />;
            break;
          case "5":
            suit = <img src={clubs05} alt="clubs" />;
            break;
          case "6":
            suit = <img src={clubs06} alt="clubs" />;
            break;
          case "7":
            suit = <img src={clubs07} alt="clubs" />;
            break;
          case "8":
            suit = <img src={clubs08} alt="clubs" />;
            break;
          case "9":
            suit = <img src={clubs09} alt="clubs" />;
            break;
          case "10":
            suit = <img src={clubs10} alt="clubs" />;
            break;
          case "Jack":
            suit = <img src={clubsJ} alt="clubs" />;
            break;
          case "Queen":
            suit = <img src={clubsQ} alt="clubs" />;
            break;
          case "King":
            suit = <img src={clubsK} alt="clubs" />;
            break;
          case "Ace":
            suit = <img src={clubsA} alt="clubs" />;
            break;
          default:
            return;
        }
        break;
      case "spades":
        switch (cardType) {
          case "2":
            suit = <img src={spades02} alt="spades" />;
            break;
          case "3":
            suit = <img src={spades03} alt="spades" />;
            break;
          case "4":
            suit = <img src={spades04} alt="spades" />;
            break;
          case "5":
            suit = <img src={spades05} alt="spades" />;
            break;
          case "6":
            suit = <img src={spades06} alt="spades" />;
            break;
          case "7":
            suit = <img src={spades07} alt="spades" />;
            break;
          case "8":
            suit = <img src={spades08} alt="spades" />;
            break;
          case "9":
            suit = <img src={spades09} alt="spades" />;
            break;
          case "10":
            suit = <img src={spades10} alt="spades" />;
            break;
          case "Jack":
            suit = <img src={spadesJ} alt="spades" />;
            break;
          case "Queen":
            suit = <img src={spadesQ} alt="spades" />;
            break;
          case "King":
            suit = <img src={spadesK} alt="spades" />;
            break;
          case "Ace":
            suit = <img src={spadesA} alt="spades" />;
            break;
          default:
            return;
        }
        break;
      case "diamonds":
        switch (cardType) {
          case "2":
            suit = <img src={diamonds02} alt="diamonds" />;
            break;
          case "3":
            suit = <img src={diamonds03} alt="diamonds" />;
            break;
          case "4":
            suit = <img src={diamonds04} alt="diamonds" />;
            break;
          case "5":
            suit = <img src={diamonds05} alt="diamonds" />;
            break;
          case "6":
            suit = <img src={diamonds06} alt="diamonds" />;
            break;
          case "7":
            suit = <img src={diamonds07} alt="diamonds" />;
            break;
          case "8":
            suit = <img src={diamonds08} alt="diamonds" />;
            break;
          case "9":
            suit = <img src={diamonds09} alt="diamonds" />;
            break;
          case "10":
            suit = <img src={diamonds10} alt="diamonds" />;
            break;
          case "Jack":
            suit = <img src={diamondsJ} alt="diamonds" />;
            break;
          case "Queen":
            suit = <img src={diamondsQ} alt="diamonds" />;
            break;
          case "King":
            suit = <img src={diamondsK} alt="diamonds" />;
            break;
          case "Ace":
            suit = <img src={diamondsA} alt="diamonds" />;
            break;
          default:
            return;
        }
        break;
      case "hearts":
        switch (cardType) {
          case "2":
            suit = <img src={hearts02} alt="hearts" />;
            break;
          case "3":
            suit = <img src={hearts03} alt="hearts" />;
            break;
          case "4":
            suit = <img src={hearts04} alt="hearts" />;
            break;
          case "5":
            suit = <img src={hearts05} alt="hearts" />;
            break;
          case "6":
            suit = <img src={hearts06} alt="hearts" />;
            break;
          case "7":
            suit = <img src={hearts07} alt="hearts" />;
            break;
          case "8":
            suit = <img src={hearts08} alt="hearts" />;
            break;
          case "9":
            suit = <img src={hearts09} alt="hearts" />;
            break;
          case "10":
            suit = <img src={hearts10} alt="hearts" />;
            break;
          case "Jack":
            suit = <img src={heartsJ} alt="hearts" />;
            break;
          case "Queen":
            suit = <img src={heartsQ} alt="hearts" />;
            break;
          case "King":
            suit = <img src={heartsK} alt="hearts" />;
            break;
          case "Ace":
            suit = <img src={heartsA} alt="hearts" />;
            break;
          default:
            return;
        }
        break;
      default:
        return;
    }
  }

  if (props.back) {
    suit = <img src={frontCard} alt="frontCard" />;
  }

  if (props.dealer) {
  } else {
  }

  return (
    <div className={`${classes.container}`}>
      <div className={`${classes.playingCard} `}>
        <div className={`${classes.FlipCard} ${animationClasses}`}>
          <div className={classes.Front}>
            <img src={frontCard} alt="frontCard" />
          </div>
          <div className={classes.Back}>{suit}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
