import { FC } from "react";

import { GAME_SIDE, WOOD_HEIGHT, WOOD_WIDTH } from "../common/common.constants";
import { TWoodType } from "../interfaces/common.interface";

type Props = {
  woodType: TWoodType;
};

const Wood: FC<Props> = (props) => {
  const { woodType } = props;

  const classNames = ["wood"];

  if (woodType === GAME_SIDE.LEFT) classNames.push("wood_left");
  if (woodType === GAME_SIDE.RIGHT) classNames.push("wood_right");

  return (
    <div
      className={classNames.join(" ")}
      style={{ height: WOOD_HEIGHT, width: WOOD_WIDTH }}
    ></div>
  );
};

export default Wood;
