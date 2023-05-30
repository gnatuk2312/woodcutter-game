import { FC } from "react";

type Props = {
  onClick: () => void;
};

const GameOver: FC<Props> = (props) => {
  const { onClick } = props;

  return (
    <div className="game-over">
      <p className="game-over__retry-text">Програш!</p>
      <button onClick={onClick} className="game-over__retry-button">
        Ще раз!
      </button>
    </div>
  );
};

export default GameOver;
