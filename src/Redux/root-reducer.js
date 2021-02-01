import {combineReducers} from 'redux';
import GameReducer from './Reducers/GameReducer';


export default combineReducers({
    game: GameReducer
});