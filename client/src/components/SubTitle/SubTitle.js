import numberWithCommas from "../../util/numberformat";

const SubTitle = (props) => {
  let subTitle =
    props.players < 2 ? (
      <h4 style={{ textAlign: "right", paddingTop: "50px", fontSize: "15px" }}>
        Amount: ${numberWithCommas(props.playerAccount)} -- You've bet $
        {numberWithCommas(props.betRound)} this round
      </h4>
    ) : (
      <div>
        <h4
          className={props.style2}
          style={{
            textAlign: "right",
            paddingTop: "50px",
            fontSize: "15px",
            paddingLeft: "0px",
          }}
        >
          Player 1 - Total: ${numberWithCommas(props.playerAccount)} -- You've
          bet ${numberWithCommas(props.betRound)} this round
        </h4>
        <h4
          className={props.style3}
          style={{ textAlign: "right", paddingTop: "1px", fontSize: "15px" }}
        >
          Player 2 - Total: ${numberWithCommas(props.playerAccount2)} -- You've
          bet ${numberWithCommas(props.betRound2)} this round
        </h4>
      </div>
    );

  return <div>{subTitle}</div>;
};

export default SubTitle;
