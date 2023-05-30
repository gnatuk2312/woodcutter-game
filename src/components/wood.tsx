import { FC } from "react";

import { WOOD_HEIGHT, WOOD_TYPE, WOOD_WIDTH } from "../common/common.constants";

type Props = {
  woodType: keyof typeof WOOD_TYPE;
};

const Wood: FC<Props> = (props) => {
  const { woodType } = props;

  const classNames = ["wood"];

  if (woodType === WOOD_TYPE.LEFT) classNames.push("wood_left");
  if (woodType === WOOD_TYPE.RIGHT) classNames.push("wood_right");

  return (
    <div
      className={classNames.join(" ")}
      style={{ height: WOOD_HEIGHT, width: WOOD_WIDTH }}
    ></div>
  );
};

export default Wood;
