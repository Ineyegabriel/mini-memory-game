import React, {useEffect, memo} from "react";
import { useSpring, animated } from "react-spring";
import {connect} from 'react-redux';
import {useHistory, Link} from 'react-router-dom';
import { ReactComponent as BackGround } from "../Assets/confetti.svg";
import { ReactComponent as Trophy } from "../Assets/trophy.svg";
import {ReactComponent as Man} from "../Assets/man.svg";
import "./ScorePage.scss";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1,
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const ScorePage = memo(({username, score, highscore}) => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 1, tension: 455, friction: 28 },
  }));

  const history = useHistory();

  useEffect(()=> {
    if(!username){
        history.push('/');
    }
  },[username, history]);

  return (
    <div className="confettiWrapper">
      <BackGround className="confetti" />
      <div className="ScoreCardWrapper">
        <div className="actionGroup">
          <ul className="action_List">
            <li className="actionItem">
              <Link to="/" className="action">End Game</Link>
            </li>
            <li className="actionItem">
              <Link to="/game" class="action">New Game</Link>
            </li>
          </ul>
        </div>
        <animated.div
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{ transform: props.xys.interpolate(trans) }}
          className="Card"
        >
          <div className="highScore_wrapper spacedBt">
            <span className="highscore">
              <div className="highScoreBadge">
                <Trophy className="highscoreLogo" />
                <span className="score">{Math.floor(highscore.score)}</span>
              </div>

              <span className="playerDetails">
                <span className="playerName">{highscore.username}</span>
                <span className="scorelabel">High score</span>
              </span>
            </span>
          </div>
          <div className="highScore_wrapper">
            <span className="highscore">
              <div className="highScoreBadge">
                <Man className="highscoreLogo" />
                <span className="score">{Math.floor(score)}</span>
              </div>

              <span className="playerDetails">
                <span className="playerName">{username}</span>
                <span className="scorelabel">Your current score</span>
              </span>
            </span>
          </div>
        </animated.div>
      </div>
    </div>
  );
});

const mapStateToProps = state =>({
  username: state.game.currentuser,
  score: state.game.score,
  highscore: state.game.highscore
})
export default connect(mapStateToProps)(ScorePage);
