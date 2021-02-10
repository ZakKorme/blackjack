import { useState } from "react";
import Dealer from "../Dealer/Dealer";
import Player from "../Player/Player";


import classes from "./Table.module.css";


const Table = (props) => {

    
    let players = props.players < 2 ? <Player playerNum={1}/>:(
        <div style={{paddingTop: "100px"}}>
            <Player playerNum={1}/>
            <Player playerNum={2}/>
        </div>
    ); 

    return (
        <div className={classes.Table}>
            <Dealer/>
            {players}
            <h4 style={{textAlign: "right"}}>Amount: ${props.bet}</h4>
            <button className={classes.Btn}>Hit</button>
            <button className={classes.Btn}>Pass</button>
        </div>
    );
}

export default Table