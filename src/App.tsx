import { FC, useCallback, useEffect, useState } from "react";

import Wood from "./components/wood";
import {
  GAME_HEIGHT,
  PLAYER_POSITION,
  WOOD_HEIGHT,
  WOOD_TYPE,
} from "./common/common.constants";
import { addNextWood, createRandomWood } from "./utils/common.utils";
import { IWood } from "./interfaces/common.interface";
import Player from "./components/player";
import Score from "./components/score";
import GameOver from "./components/game-over";
import Timer from "./components/timer";

const WOOD_COUNT = GAME_HEIGHT / WOOD_HEIGHT;

const START_WOOD_ARRAY: IWood[] = [];
// Crete basic wood array
for (let i = 0; i <= WOOD_COUNT; i++) {
  if (i === WOOD_COUNT || i % 2 === 0) {
    START_WOOD_ARRAY.push({ id: Math.random(), woodType: WOOD_TYPE.NONE });
  } else {
    START_WOOD_ARRAY.push(createRandomWood());
  }
}

const App: FC = () => {
  const [timer, setTimer] = useState(10000);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [woodArray, setWoodArray] = useState<IWood[]>(START_WOOD_ARRAY);
  const [playerPosition, setPlayerPosition] = useState<
    keyof typeof PLAYER_POSITION
  >(PLAYER_POSITION.LEFT);

  const handleLeftGameClick = useCallback(() => {
    setPlayerPosition(PLAYER_POSITION.LEFT);
    setWoodArray((prev) => prev.slice(0, -1));
    setWoodArray((prev) => [addNextWood(woodArray), ...prev]);

    if (woodArray[woodArray.length - 2].woodType === WOOD_TYPE.LEFT) {
      setGameOver(true);
      setScore(0);
      setTimer(10000);
      return;
    }
    setScore((prev) => prev + 1);
    if (timer >= 10000) {
      return;
    }
    setTimer((prev) => prev + 500);
  }, [woodArray, timer]);

  const handleRightGameClick = useCallback(() => {
    setPlayerPosition(PLAYER_POSITION.RIGHT);
    setWoodArray((prev) => prev.slice(0, -1));
    setWoodArray((prev) => [addNextWood(woodArray), ...prev]);

    if (woodArray[woodArray.length - 2].woodType === WOOD_TYPE.RIGHT) {
      setGameOver(true);
      setScore(0);
      setTimer(10000);
      return;
    }
    setScore((prev) => prev + 1);
    if (timer >= 10000) {
      return;
    }
    setTimer((prev) => prev + 500);
  }, [woodArray, timer]);

  const handleGameClick = useCallback(
    (event: MouseEvent) => {
      const windowWidth = window.innerWidth;
      const windowCenterX = windowWidth / 2;

      if (event.x <= windowCenterX) {
        handleLeftGameClick();
      } else {
        handleRightGameClick();
      }
    },
    [handleLeftGameClick, handleRightGameClick]
  );

  if (timer <= 0) {
    setGameOver(true);
    setTimer(10000);
  }

  useEffect(() => {
    window.addEventListener("click", handleGameClick);

    return () => {
      window.removeEventListener("click", handleGameClick);
    };
  }, [handleGameClick]);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 20);
      }, 10);

      return () => {
        clearInterval(interval);
      };
    }
  }, [gameOver]);

  return (
    <div className="game">
      <div className="game__container" style={{ height: GAME_HEIGHT }}>
        {woodArray.map(({ id, woodType }) => (
          <Wood key={id} woodType={woodType} />
        ))}
        <Player position={playerPosition} />
        <Score>{score}</Score>
        <Timer timer={timer} />
        {gameOver && <GameOver onClick={() => setGameOver(false)} />}
      </div>
    </div>
  );
};

export default App;
