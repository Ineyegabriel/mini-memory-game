import { GameActionTypes } from "../ActionType";
import initialState from '../initialState';
const GameReducer = (state = initialState, action) => {
  switch (action.type) {
    case GameActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentuser: action.payload,
      };
    case GameActionTypes.SET_CURRENT_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    case GameActionTypes.SET_CURRENT_HIGHSCORE:
      return {
        ...state,
        highscore: action.payload
      }
    default:
      return state;
  }
};
export default GameReducer;
