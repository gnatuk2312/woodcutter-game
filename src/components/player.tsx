import { FC } from "react";

import { PLAYER_POSITION } from "../common/common.constants";

type Props = {
  position: keyof typeof PLAYER_POSITION;
};

const Player: FC<Props> = (props) => {
  const { position } = props;

  const classNames = ["player"];

  if (position === PLAYER_POSITION.LEFT) classNames.push("player_left");
  if (position === PLAYER_POSITION.RIGHT) classNames.push("player_right");

  return <div className={classNames.join(" ")}></div>;
};

export default Player;
