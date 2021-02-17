import { Link } from "react-router-dom";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <div>
      <Link to={props.player}>
        <button
          className={classes.Btn}
          style={{ fontSize: "30px", padding: "10px" }}
        >
          {props.name}
        </button>
      </Link>
    </div>
  );
};

export default Button;
