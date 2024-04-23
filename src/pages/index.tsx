import styles from './index.module.css';
import { useState } from 'react';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 1, 2, 1, 0, 0, 0],
    [2, 1, 1, 0, 0, 0, 0, 0],
    [2, 1, 1, 0, 0, 0, 0, 0],
    [1, 2, 2, 0, 0, 0, 0, 0],
  ]);
  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    const newBoard = structuredClone(board);

    if (newBoard[y][x] === 0) {
      if (board[y + 1] !== undefined && board[y + 1][x] === 3 - turnColor) {
        if (board[y + 2] !== undefined && board[y + 2][x] === turnColor) {
          newBoard[y][x] = turnColor;
          setTurnColor(3 - turnColor);
          setBoard(newBoard);
        } else if (board[y + 2] !== undefined && board[y + 2][x] === 3 - turnColor) {
          if (board[y + 3] !== undefined && board[y + 3][x] === turnColor) {
            newBoard[y][x] = turnColor;
            setTurnColor(3 - turnColor);
            setBoard(newBoard);
          }
        }
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.boardstyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellstyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stonestyle}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
