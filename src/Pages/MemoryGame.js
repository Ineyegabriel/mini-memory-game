import React, { useState, useEffect, memo } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useGetHighScore } from "../Utils/helper";
import Game from "../Components/Game";
import Header from "../Components/Header";
import { setCurrentHighScore } from "../Redux/Actions/GameAction";
import "./MemoryStyles.scss";

const MemoryGame = memo(({ username, settingHighScore }) => {
  const [options, setOptions] = useState(12);
  const [highScore, setHighScore] = useGetHighScore(username);
  const history = useHistory();
  useEffect(() => {
    if (!username) {
      history.push("/");
    }
    settingHighScore(highScore);
  }, [username, history, highScore, settingHighScore]);
  return (
    <div className="gameWarapper">
      <Header />
      <Game
        options={options}
        setOptions={setOptions}
        highScore={highScore}
        setHighScore={setHighScore}
      />
    </div>
  );
});

const mapStateToProps = (state) => ({
  username: state.game.currentuser,
});
const mapDispatchToProps = (dispatch) => ({
  settingHighScore: (highscore) => dispatch(setCurrentHighScore(highscore)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MemoryGame);
