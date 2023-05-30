import { FC } from "react";

import {
  TIMER_HEIGHT,
  TIMER_MAXIMUM_MS,
  TIMER_WIDTH,
} from "../common/common.constants";

type Props = {
  timer: number;
};

const Timer: FC<Props> = (props) => {
  const { timer } = props;

  let leftPosition = (timer / TIMER_MAXIMUM_MS) * TIMER_WIDTH;
  if (leftPosition >= TIMER_WIDTH) leftPosition = TIMER_WIDTH;

  return (
    <div className="timer" style={{ width: TIMER_WIDTH, height: TIMER_HEIGHT }}>
      <div
        className="timer__complete-bar"
        style={{ width: TIMER_WIDTH, height: TIMER_HEIGHT, left: leftPosition }}
      ></div>
    </div>
  );
};

export default Timer;
