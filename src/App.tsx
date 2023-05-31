import { FC, useCallback, useEffect, useState } from "react";

import Wood from "./components/wood";
import Player from "./components/player";
import Score from "./components/score";
import GameOver from "./components/game-over";
import Timer from "./components/timer";
import Level from "./components/level";
import {
  INITIAL_WOOD_ARRAY,
  TIMER_STEP_PER_CLICK_MS,
  TIMER_MAXIMUM_MS,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  SCORE_STEP_FOR_LEVEL_UP,
  WINDOW_CENTER_X,
  TIMER_INTERVAL_DELAY,
  TIMER_INTERVAL_MINUS_STEP,
  GAME_SIDE,
} from "./common/common.constants";
import { addNextWood } from "./utils/common.utils";
import { IWood, TGameSide } from "./interfaces/common.interface";

const App: FC = () => {
  const [timer, setTimer] = useState<number>(TIMER_MAXIMUM_MS);
  const [score, setScore] = useState<number>(0);
  const [gameLevel, setGameLevel] = useState<number>(1);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [woodArray, setWoodArray] = useState<IWood[]>(INITIAL_WOOD_ARRAY);
  const [playerPosition, setPlayerPosition] = useState<TGameSide>(
    GAME_SIDE.LEFT
  );

  const gameOver = () => {
    setIsGameOver(true);
  };

  const gameReset = () => {
    setScore(0);
    setGameLevel(1);
    setTimer(TIMER_MAXIMUM_MS);
    setWoodArray(INITIAL_WOOD_ARRAY);
    setIsGameOver(false);
  };

  // TODO: display seconds in timer
  // TODO: add textures for all items
  // TODO: user need to click on screen when first in a game to start playing

  const handleMainGameAction = useCallback(
    (gameSide: TGameSide) => {
      if (isGameOver) return;

      setWoodArray((prev) => prev.slice(0, -1));
      setWoodArray((prev) => [addNextWood(woodArray), ...prev]);
      setPlayerPosition(gameSide);
      setScore((prev) => ++prev);

      if (timer >= TIMER_MAXIMUM_MS) return;
      setTimer((prev) => prev + TIMER_STEP_PER_CLICK_MS);

      if (score / SCORE_STEP_FOR_LEVEL_UP > gameLevel)
        setGameLevel((prev) => ++prev);

      if (woodArray[woodArray.length - 2].woodType === gameSide) gameOver();
      if (woodArray[woodArray.length - 1].woodType === gameSide) gameOver();
    },
    [isGameOver, woodArray, timer, score, gameLevel]
  );

  const handleGameClickEventListener = useCallback(
    (event: MouseEvent) => {
      if (event.x <= WINDOW_CENTER_X) {
        handleMainGameAction(GAME_SIDE.LEFT);
      } else {
        handleMainGameAction(GAME_SIDE.RIGHT);
      }
    },
    [handleMainGameAction]
  );

  const handleGameKeydownEventListener = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") handleMainGameAction(GAME_SIDE.RIGHT);
      if (event.key === "ArrowLeft") handleMainGameAction(GAME_SIDE.LEFT);
    },
    [handleMainGameAction]
  );

  useEffect(() => {
    document.addEventListener("click", handleGameClickEventListener);
    document.addEventListener("keydown", handleGameKeydownEventListener);
    return () => {
      document.removeEventListener("click", handleGameClickEventListener);
      document.removeEventListener("keydown", handleGameKeydownEventListener);
    };
  }, [handleGameClickEventListener, handleGameKeydownEventListener]);

  useEffect(() => {
    if (!isGameOver) {
      const timerInterval = setInterval(() => {
        setTimer((prev) => prev - (TIMER_INTERVAL_MINUS_STEP + gameLevel));
      }, TIMER_INTERVAL_DELAY);

      return () => clearInterval(timerInterval);
    }
  }, [isGameOver, gameLevel]);

  useEffect(() => {
    if (timer <= 0) gameOver();
  }, [timer]);

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
      {isGameOver && <GameOver onClick={gameReset} />}
    </div>
  );
};

export default App;
