import classes from "./Card.module.css";

const Card = (props) => {
    return (
        <div className={classes.Card}>
            <span className={classes.Rank}>{props.number}</span>
            <br/>
            <span className={classes.Suit}>{props.suit}</span>
        </div>
    );
};

export default Card