import { useState, useEffect } from "react";

/**
 * custom Hook that handles the operation of the memory game operation such as
 * ensuring two cards are flipped, calculating the score, setting new high score
 * setting the colors, shuffling the colors and displaying appropriate cards
 * @param {props} - props from the calling components
 * @param {objects} - props from components
 * @returns {objects} - exposes the functions and their value from the useState Hook 
 */
export function useGame({
  options,
  setHighScore,
  setOptions,
  highScore,
  username,
}) {
  const [game, setGame] = useState([]);
  const [flippedCount, setFlippedCount] = useState(0);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [count, setCount] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const colors = [
    "#ecdb54",
    "#e34132",
    "#6ca0dc",
    "#944743",
    "#dbb2d1",
    "#ec9787",
    "#00a68c",
    "#645394",
    "#6c4f3d",
    "#ebe1df",
    "#bc6ca7",
    "#bfd833",
  ];

  useEffect(() => {
    const newGame = [];
    for (let i = 0; i < options / 2; i++) {
      const firstOption = {
        id: 2 * i,
        colorId: i,
        color: colors[i],
        flipped: false,
      };
      const secondOption = {
        id: 2 * i + 1,
        colorId: i,
        color: colors[i],
        flipped: false,
      };

      newGame.push(firstOption);
      newGame.push(secondOption);
    }

    const shuffledGame = newGame.sort(() => Math.random() - 0.5);
    setGame(shuffledGame);
  }, [options]);

  useEffect(() => {
    const finished = !game.some((card) => !card.flipped);
    if (finished && game.length > 0) {
      setTimeout(() => {
        const bestPossible = game.length;
        let multiplier;

        if (options === 12) {
          multiplier = 5;
        } else if (options === 18) {
          multiplier = 2.5;
        } else if (options === 24) {
          multiplier = 1;
        }

        const pointsLost = multiplier * (0.66 * flippedCount - bestPossible);

        let score;
        if (pointsLost < 100) {
          score = 100 - pointsLost;
        } else {
          score = 1;
        }
        setCount(score);

        if (score > highScore.score) {
          const data = {
            username,
            score,
          };
          setHighScore(data);
        }
      }, 500);
    }
  }, [
    game,
    highScore.score,
    count,
    flippedCount,
    username,
    options,
    setHighScore,
  ]);

 
  /**
   * This conditional statement is what ensures that two cards are flipped,
   * aimming to pair them
   * 
   */
  if (flippedIndexes.length === 2) {
    const match =
      game[flippedIndexes[0]].colorId === game[flippedIndexes[1]].colorId;

    if (match) {
      const newGame = [...game];
      newGame[flippedIndexes[0]].flipped = true;
      newGame[flippedIndexes[1]].flipped = true;
      setGame(newGame);

      const newIndexes = [...flippedIndexes];
      newIndexes.push(false);
      setFlippedIndexes(newIndexes);
    } else {
      const newIndexes = [...flippedIndexes];
      newIndexes.push(true);
      setFlippedIndexes(newIndexes);
    }
  }
  return {
    game,
    flippedCount,
    setFlippedCount,
    flippedIndexes,
    setFlippedIndexes,
    count,
  };
}

/**
 * custom Hook utilizing the browser localstorage to manage the highscores with its
 * appropriate username
 * @param {string} username 
 * @returns {Array} - containing the state storage and setStorage
 * @returns {object} - initiate state
 * @returns {object} - fetchStorage object from browser with the key
 */
export const useGetHighScore = (username) => {
  const get = () => {
    const initialState = {
      username,
      score: 0,
    };
    let fetchStorage = localStorage.getItem("React-MemoryGame-highscore");
    if (fetchStorage) {
      return JSON.parse(fetchStorage);
    }
    return initialState;
  };

  const [storage, setStorage] = useState(get());
  useEffect(() => {
    localStorage.setItem("React-MemoryGame-highscore", JSON.stringify(storage));
  }, [storage]);
  return [storage, setStorage];
};
