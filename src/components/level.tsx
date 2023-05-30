import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Level: FC<Props> = (props) => {
  const { children } = props;

  return <div className="level">Рівень: {children}</div>;
};

export default Level;
