import React,{useEffect} from "react";
import {connect} from 'react-redux';
import "./Styles.scss";
import Card from "./Card";
import { useGame } from "../Utils/helper";
import {setCurrentScore} from '../Redux/Actions/GameAction';
const Game = ({settingScore, ...props}) => {
  const {
    game,
    flippedCount,
    setFlippedCount,
    flippedIndexes,
    setFlippedIndexes,
    count
  } = useGame({ ...props });
  useEffect(() => {
    settingScore(count);
  }, [count,settingScore]);
  if (game.length === 0) return <div>loading...</div>;
  else {  
    return (
      <div id="cards">
        {game.map((card, index) => (
          <div className="card" key={index}>
            <Card
              id={index}
              color={card.color}
              game={game}
              flippedCount={flippedCount}
              setFlippedCount={setFlippedCount}
              flippedIndexes={flippedIndexes}
              setFlippedIndexes={setFlippedIndexes}
            />
          </div>
        ))}
      </div>
    );
  }
};
const mapStateToProps = state => ({
  username: state.game.currentuser,
})
const mapDispatchToProps = dispatch => ({
  settingScore: (score) => dispatch(setCurrentScore(score))
})
export default connect(mapStateToProps,mapDispatchToProps)(Game);
