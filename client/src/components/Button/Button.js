import classes from "./Button.module.css"

const Button = (props) => {
    return (
        <div >
            <button className={classes.Btn} style={{"fontSize": "30px", padding: "10px"}}>{props.name}</button>
        </div>
    );
};

export default Button