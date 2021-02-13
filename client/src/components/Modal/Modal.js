import Modal from "react-modal";

Modal.setAppElement("#root");
const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalCustom = (props) => {
  let modal = null;

  if (props.round) {
    switch (props.round) {
      case "start":
        modal = (
          <Modal isOpen={props.showModal} style={modalStyle}>
            <h2>How much would you like to bet on this round?</h2>
            <p>Your funds are below:</p>
            <p>${props.playerAccount}</p>
            <form>
              <input
                type="number"
                placeholder={"$"}
                onChange={props.betHandler}
              />
              <button onClick={props.modalHandler}>Lets Play!</button>
              <button>Cancel</button>
            </form>
          </Modal>
        );
        break;
      case "endgame-win":
        modal = (
          <Modal isOpen={props.showModal} style={modalStyle}>
            <h2>You've won!</h2>
            <p>We've added the following to your account</p>
            <p style={{ color: "green" }}>${props.betRound * 1.5}</p>
            <form>
              <button onClick={props.playAgainHandler}>Lets Play Again!</button>
              <button>End Game</button>
            </form>
          </Modal>
        );
        break;
      case "endgame-loss":
        modal = (
          <Modal isOpen={props.showModal} style={modalStyle}>
            <h2>You've lost...</h2>
            <p>We've deducted the following from your account</p>
            <p style={{ color: "red" }}>${props.betRound}</p>
            <form>
              <button onClick={props.playAgainHandler}>Lets Play Again!</button>
              <button>End Game</button>
            </form>
          </Modal>
        );
        break;
      default:
        return;
    }
  }

  return modal;
};

export default ModalCustom;
