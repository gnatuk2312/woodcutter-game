import { FC, useCallback, useEffect, useState } from "react";

import Wood from "./components/wood";
import Player from "./components/player";
import Score from "./components/score";
import GameOver from "./components/game-over";
import Timer from "./components/timer";
import Level from "./components/level";
import {
  GAME_HEIGHT,
  PLAYER_POSITION,
  WOOD_TYPE,
} from "./common/common.constants";
import { addNextWood, generateWoodAtTheStart } from "./utils/common.utils";
import { IWood } from "./interfaces/common.interface";

const initialWoodArray = generateWoodAtTheStart();

// TODO: add adaptive game width depends on device
// TODO: lost the game if go on branch directly

const App: FC = () => {
  const [timer, setTimer] = useState<number>(10000);
  const [score, setScore] = useState<number>(0);
  const [gameLevel, setGameLevel] = useState<number>(1);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [woodArray, setWoodArray] = useState<IWood[]>(initialWoodArray);
  const [playerPosition, setPlayerPosition] = useState<
    keyof typeof PLAYER_POSITION
  >(PLAYER_POSITION.LEFT);

  const gameOverAndReset = () => {
    setGameOver(true);
    setScore(0);
    setTimer(10000);
    setGameLevel(1);
    setWoodArray(initialWoodArray);
    return;
  };

  const handleGameClick = useCallback(
    (side: "left" | "right") => {
      setWoodArray((prev) => prev.slice(0, -1));
      setWoodArray((prev) => [addNextWood(woodArray), ...prev]);
      setPlayerPosition(
        side === "left" ? PLAYER_POSITION.LEFT : PLAYER_POSITION.RIGHT
      );
      setScore((prev) => prev + 1);

      if (timer >= 10000) return;
      setTimer((prev) => prev + 500);

      if (score / 10 > gameLevel) {
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
      const windowWidth = window.innerWidth;
      const windowCenterX = windowWidth / 2;

      if (event.x <= windowCenterX) {
        handleGameClick("left");
      } else {
        handleGameClick("right");
      }
    },
    [handleGameClick]
  );

  if (timer <= 0) {
    setGameOver(true);
    setTimer(10000);
  }

  useEffect(() => {
    window.addEventListener("click", startGame);

    return () => {
      window.removeEventListener("click", startGame);
    };
  }, [startGame]);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - (20 + gameLevel));
      }, 10);

      return () => {
        clearInterval(interval);
      };
    }
  }, [gameOver, gameLevel]);

  return (
    <div className="game">
      <div className="game__container" style={{ height: GAME_HEIGHT }}>
        {woodArray.map(({ id, woodType }) => (
          <Wood key={id} woodType={woodType} />
        ))}
        <Player position={playerPosition} />
        <Score>{score}</Score>
        <Level>{gameLevel}</Level>
        <Timer timer={timer} />
        {gameOver && <GameOver onClick={() => setGameOver(false)} />}
      </div>
    </div>
  );
};

export default App;
