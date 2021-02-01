import {GameActionTypes} from '../ActionType';

export const setCurrentUser = username =>({
    type: GameActionTypes.SET_CURRENT_USER,
    payload: username
})

export const setCurrentScore = score =>({
    type: GameActionTypes.SET_CURRENT_SCORE,
    payload: score
})

export const setCurrentHighScore = score => ({
    type: GameActionTypes.SET_CURRENT_HIGHSCORE,
    payload: score
})