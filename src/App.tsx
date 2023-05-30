import { FC, useCallback, useEffect, useState } from "react";

import Wood from "./components/wood";
import Player from "./components/player";
import Score from "./components/score";
import GameOver from "./components/game-over";
import Timer from "./components/timer";
import Level from "./components/level";
import {
  INITIAL_WOOD_ARRAY,
  PLAYER_POSITION,
  TIMER_STEP_PER_CLICK_MS,
  TIMER_MAXIMUM_MS,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  WOOD_TYPE,
  SCORE_STEP_FOR_LEVEL_UP,
  WINDOW_CENTER_X,
  TIMER_INTERVAL_DELAY,
  TIMER_INTERVAL_MINUS_STEP,
} from "./common/common.constants";
import { addNextWood } from "./utils/common.utils";
import { IWood } from "./interfaces/common.interface";

const App: FC = () => {
  const [timer, setTimer] = useState<number>(TIMER_MAXIMUM_MS);
  const [score, setScore] = useState<number>(0);
  const [gameLevel, setGameLevel] = useState<number>(1);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [woodArray, setWoodArray] = useState<IWood[]>(INITIAL_WOOD_ARRAY);
  const [playerPosition, setPlayerPosition] = useState<
    keyof typeof PLAYER_POSITION
  >(PLAYER_POSITION.LEFT);

  const gameOverAndReset = () => {
    setGameOver(true);
    setScore(0);
    setTimer(TIMER_MAXIMUM_MS);
    setGameLevel(1);
    setWoodArray(INITIAL_WOOD_ARRAY);
    return;
  };

  // TODO: avoid using two enums and "left" | "right", create one enum GAME_SIDE for all needs
  // TODO: display seconds in timer
  // TODO: add textures for all items
  // TODO: create two different functions gameOver and ResetGame
  // TODO: user need to click on screen when first in a game to start playing

  const handleGameClick = useCallback(
    (side: "left" | "right") => {
      setWoodArray((prev) => prev.slice(0, -1));
      setWoodArray((prev) => [addNextWood(woodArray), ...prev]);
      setPlayerPosition(
        side === "left" ? PLAYER_POSITION.LEFT : PLAYER_POSITION.RIGHT
      );
      setScore((prev) => ++prev);

      if (timer >= TIMER_MAXIMUM_MS) return;
      setTimer((prev) => prev + TIMER_STEP_PER_CLICK_MS);

      if (score / SCORE_STEP_FOR_LEVEL_UP > gameLevel) {
        setGameLevel((prev) => prev + 1);
      }

      if (
        woodArray[woodArray.length - 2].woodType ===
        (side === "left" ? WOOD_TYPE.LEFT : WOOD_TYPE.RIGHT)
      ) {
        gameOverAndReset();
      }
    },
    [woodArray, timer, score, gameLevel]
  );

  const startGame = useCallback(
    (event: MouseEvent) => {
      if (event.x <= WINDOW_CENTER_X) {
        handleGameClick("left");
      } else {
        handleGameClick("right");
      }
    },
    [handleGameClick]
  );

  if (timer <= 0) {
    gameOverAndReset();
  }

  useEffect(() => {
    window.addEventListener("click", startGame);
    return () => window.removeEventListener("click", startGame);
  }, [startGame]);

  useEffect(() => {
    if (!gameOver) {
      const timerInterval = setInterval(() => {
        setTimer((prev) => prev - (TIMER_INTERVAL_MINUS_STEP + gameLevel));
      }, TIMER_INTERVAL_DELAY);

      return () => clearInterval(timerInterval);
    }
  }, [gameOver, gameLevel]);

  return (
    <div
      className="game"
      style={{ height: WINDOW_HEIGHT, width: WINDOW_WIDTH }}
    >
      {woodArray.map(({ id, woodType }) => (
        <Wood key={id} woodType={woodType} />
      ))}
      <Player position={playerPosition} />
      <Score>{score}</Score>
      <Level>{gameLevel}</Level>
      <Timer timer={timer} />
      {gameOver && <GameOver onClick={() => setGameOver(false)} />}
    </div>
  );
};

export default App;
