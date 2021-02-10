import { useState } from 'react';
import Title from "../../components/Title/Title";
import Table from "../../components/Table/Table";

const Singleplayer = (props) => {
    const [bet, setBet] = useState(0);
    const [gameStart, setGameStart] = useState(false);


    const onBet = (event) => {
        event.preventDefault()
        setBet(event.target.value)
    };

    const onGameStart = () => {
        if (!bet) return console.log("You must bet first!");
        setGameStart((<Table players={1} bet={bet}/>));
        
    }

    let game = (
        <div>
            <h2>How much would you like to bet today?</h2>
            <input type="number" onChange={onBet}/>
            <button onClick={onGameStart}>Lets play!</button>
        </div>
    );

    return (
        <div>
            <Title title={"Single-Player"}/>
            {gameStart ? gameStart:game}
        </div>
    );
};

export default Singleplayer