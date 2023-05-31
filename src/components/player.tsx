import { FC } from "react";

import { GAME_SIDE } from "../common/common.constants";
import { TGameSide } from "../interfaces/common.interface";

type Props = {
  position: TGameSide;
};

const Player: FC<Props> = (props) => {
  const { position } = props;

  const classNames = ["player"];

  if (position === GAME_SIDE.LEFT) classNames.push("player_left");
  if (position === GAME_SIDE.RIGHT) classNames.push("player_right");

  return <div className={classNames.join(" ")}></div>;
};

export default Player;
