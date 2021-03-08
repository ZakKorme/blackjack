const Player = (props) => {
  return (
    <div>
      <h2 style={{ color: "rgb(240, 240, 240)", textAlign: "center" }}>
        Player {props.playerNum}
      </h2>
    </div>
  );
};

export default Player;
