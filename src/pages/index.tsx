import styles from './index.module.css';
import { useState } from 'react';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const clickHandler = (x: number, y: number) => {
    console.log('今の座標は', x, y);
    const newBoard = structuredClone(board);

    const directions = [
      [0, 1], //下
      [1, 1], //右下
      [1, 0], //右
      [1, -1], //右上
      [0, -1], //上
      [-1, -1], //左上
      [-1, 0], //左
      [-1, 1], //左上
    ];
    if (newBoard[y][x] === 0) {
      for (const direction of directions) {
        const [x1, y1] = direction;

        for (let i = 1; i < 8; i++) {
          //オセロを置くi個下の座標
          if (board[y + y1 * i] === undefined) {
            //y座標の範囲外
            break;
          } else if (board[y + y1 * i][x + x1 * i] === undefined) {
            // x,y座標の範囲外
            break;
          } else if (board[y + y1 * i][x + x1 * i] === 0) {
            // 置いてない座標
            break;
          } else if (board[y + y1 * i][x + x1 * i] === turnColor) {
            // 置いたオセロと同じ色
            if (i > 1) {
              if (board[y + y1 * i][x + x1 * i] === board[y + y1][x + x1]) {
                // // 周囲の座標の色と周囲の座標の周りの色
                break;
              } else {
                for (let s = i; s >= 0; s--) {
                  newBoard[y + y1 * s][x + x1 * s] = turnColor;
                }
                setTurnColor(3 - turnColor);
                setBoard(newBoard);

                break;
              }
            }
          } else if (board[y + y1 * i][x + x1 * i] === 3 - turnColor) {
            //置いたオセロと異なる色

            continue;
          }
        }
      }
    }
  };
  const colorNum = (col: number) => board.flat().filter((c) => c === col).length;

  return (
    <div className={styles.container}>
      <>
        <span className={styles.textlarge}>black {colorNum(1)}</span>
        <span className={styles.textlarge}>white {colorNum(2)}</span>
        <br />
        <span className={styles.textlarge}> {['', '黒のターン', '白のターン'][turnColor]}</span>
      </>
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
