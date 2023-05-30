import { FC } from "react";

type Props = {
  timer: number;
};

const TIMER_WIDTH = 300;

const Timer: FC<Props> = (props) => {
  const { timer } = props;

  let left = (timer / 100) * 3;

  if (left >= TIMER_WIDTH) {
    left = TIMER_WIDTH;
  }

  return (
    <div className="timer" style={{ width: TIMER_WIDTH }}>
      <div
        className="timer__complete-bar"
        style={{ width: TIMER_WIDTH, left }}
      ></div>
    </div>
  );
};

export default Timer;
