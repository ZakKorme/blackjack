import React from "react"
import classes from "./Title.module.css"

const Title = (props) => {
    return (
            <h1 className={classes.Title} style={{"fontSize": "60px"}}>{props.title}</h1>
    );
};


export default Title