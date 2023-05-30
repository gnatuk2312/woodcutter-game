import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Score: FC<Props> = (props) => {
  const { children } = props;

  return <div className="score">Рахунок: {children}</div>;
};

export default Score;
