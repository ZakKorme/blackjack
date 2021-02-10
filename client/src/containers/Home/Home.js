import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";

import classes from "./Home.module.css";

const Home = (props) => {
    return (
        <div>
            <Title title={"Black Jack"}/>
            <div className={classes.PlayerBtn}>
                <div>
                    <Button name={"Singe-player"}/>
                </div>
                <div style={{paddingLeft: "100px"}}>
                    <Button name={"Multi-player"}/>
                </div>
                
            </div>
        </div>
    );
};


export default Home