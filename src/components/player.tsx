import { FC, useEffect, useMemo, useRef } from "react";

import { GAME_SIDE } from "../common/common.constants";
import { TGameSide } from "../interfaces/common.interface";

type Props = {
  position: TGameSide;
  score: number;
};

const Player: FC<Props> = (props) => {
  const { position, score } = props;

  const classNames = useRef(["player"]);
  const memoizedClassNames = useMemo(() => classNames, []);

  useEffect(() => {
    if (position === GAME_SIDE.LEFT)
      memoizedClassNames.current = ["player", "player_animated", "player_left"];
    if (position === GAME_SIDE.RIGHT)
      memoizedClassNames.current = [
        "player",
        "player_animated",
        "player_right",
      ];

    const timeout = setTimeout(() => {
      memoizedClassNames.current = memoizedClassNames.current.filter(
        (cn) => cn !== "player_animated"
      );
    }, 100);

    return () => clearTimeout(timeout);
  }, [score, memoizedClassNames, position]);

  return <div className={memoizedClassNames.current.join(" ")}></div>;
};

export default Player;
