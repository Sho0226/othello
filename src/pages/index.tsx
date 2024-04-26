import styles from './index.module.css';
import { useState } from 'react';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [1, 2, 1, 2, 1, 2, 1, 2],
    [2, 1, 2, 1, 2, 1, 2, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 1, 2, 1, 0, 0, 2],
    [2, 1, 1, 0, 0, 2, 2, 2],
    [2, 1, 1, 0, 0, 2, 2, 2],
    [1, 2, 2, 0, 0, 1, 1, 1],
  ]);
  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    const newBoard = structuredClone(board);

    const d = [
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
    ];

    for (const directions of d) {
      const [x1, y1] = directions;
      const x2 = x + x1;
      const y2 = y + y1;
    }

    if (newBoard[y][x] === 0) {
      for (let i = 1; i < 8; i++) {
        //オセロを置くi個下の座標
        if (board[y + i] === undefined) {
          //y座標の範囲外
          break;
        } else if (board[y + i][x] === undefined) {
          // x,y座標の範囲外
          break;
        } else if (board[y + i][x] === 0) {
          // 置いてない座標
          break;
        } else if (board[y + i][x] === turnColor) {
          // 置いたオセロと同じ色
          if (i > 1) {
            for (let s = i; s >= 0; s--) {
              newBoard[y + s][x] = turnColor;
            }
            setTurnColor(3 - turnColor);
            setBoard(newBoard);
          }
          break;
        } else if (board[y + i][x] === 3 - turnColor) {
          //置いたオセロと異なる色
          continue;
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
