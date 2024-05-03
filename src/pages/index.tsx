import styles from './index.module.css';
import { useState } from 'react';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const directions = [
    [0, 1], // Down
    [1, 1], // Down-right
    [1, 0], // Right
    [1, -1], // Up-right
    [0, -1], // Up
    [-1, -1], // Up-left
    [-1, 0], // Left
    [-1, 1], // Down-left
  ];

  const clickHandler = (x: number, y: number) => {
    console.log('今の座標は', x, y);
    const newBoard = structuredClone(board);

    for (let a = 0; a < 8; a++) {
      for (let b = 0; b < 8; b++) {
        if (board[b][a] === 3) {
          newBoard[b][a] = 0;
        }
      }
    }

    if (board[y][x] === 3) {
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
          } else if (board[y + y1 * i][x + x1 * i] === 0 && board[y + y1 * i][x + x1 * i] === 3) {
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

    for (let i = 0; i < 8; i++) {
      console.log('abc');
      for (let j = 0; j < 8; j++) {
        console.log('cde');
        if (newBoard[i][j] === 0) {
          for (const direction of directions) {
            const [x1, y1] = direction;
            for (let k = 1; k < 8; k++) {
              const newX = j + x1 * k;
              const newY = i + y1 * k;

              if (newBoard[newY] === undefined) {
                break;
              } else if (newBoard[newY][newX] === undefined) {
                break;
              } else if (newBoard[newY][newX] === 0) {
                break;
              } else if (newBoard[newY][newX] === 3) {
                break;
              } else if (newBoard[newY][newX] === 3 - turnColor) {
                console.log('aaa');
                if (k > 1) {
                  if (newBoard[newY][newX] === newBoard[i + y1][j + x1]) {
                    console.log('bbb');
                    break;
                  } else {
                    console.log('CCC');
                    newBoard[i][j] = 3;

                    break;
                  }
                }
              } else if (newBoard[newY][newX] === turnColor) {
                console.log(222);
                continue;
              }
            }
          }
        }
      }
    }
    console.table(newBoard);
  };

  const colorNum = (col: number) => board.flat().filter((c) => c === col).length;
  return (
    <div className={styles.container}>
      <>
        <span className={styles.textlarge}>
          black {colorNum(1)} / white {colorNum(2)}
        </span>

        <br />
        <span className={styles.textlarge}> {['', '黒のターン', '白のターン'][turnColor]}</span>
      </>
      <div className={styles.boardstyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellstyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={`${styles.stonestyle} ${color === 3 ? styles.blue : ''}`}
                  style={{ background: color === 1 ? '#000' : color === 2 ? '#fff' : '#00f' }}
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
