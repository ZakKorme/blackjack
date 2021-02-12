import Dealer from "../Dealer/Dealer";
import Player from "../Player/Player";
import Deck from "../../util/deck";
import Card from "../Card/Card";


import classes from "./Table.module.css";


const Table = (props) => {

    let players = props.players < 2 ? <Player playerNum={1}/>:(
        <div style={{paddingTop: "100px"}}>
            <Player playerNum={1}/>
            <Player playerNum={2}/>
        </div>
    ); 
    
    
    let dealerCards = [];
    let playerCards = [];

    if (props.gameStart) {
        let dealer = new Deck();
        let player1 = new Deck();

        dealer.shuffle()
        player1.shuffle()
        
        let dealerCard1 = dealer.deal();
        let dealerCard2 = dealer.deal();

        let playerCard1 = player1.deal();
        let playerCard2 = player1.deal();

        dealerCards.push(<Card suit={dealerCard1[0]} number={dealerCard1[1]}/>);
        dealerCards.push(<Card suit={dealerCard2[0]} number={dealerCard2[1]}/>);
        playerCards.push(<Card suit={playerCard1[0]} number={playerCard1[1]}/>);
        playerCards.push(<Card suit={playerCard2[0]} number={playerCard2[1]}/>);
        

    }


    return (
        <div className={classes.Table}>
            <Dealer/>
            <div>
                {dealerCards}
            </div>
            {players}
            <div>
                {playerCards}
            </div>
            <h4 style={{textAlign: "right"}}>Amount: ${props.bet}</h4>
            <button className={classes.Btn}>Hit</button>
            <button className={classes.Btn}>Pass</button>
        </div>
    );
}

export default Table