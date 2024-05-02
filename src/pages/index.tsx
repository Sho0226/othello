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

  console.log(1);

  const clickHandler = (x: number, y: number) => {
    console.log('今の座標は', x, y);
    const newBoard = structuredClone(board);

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
    if (newBoard[y][x] === 3) {
      console.log(10);
      const updatedBoard = board.map((row) => row.map((cell) => (cell === 3 ? 0 : cell)));
      for (const direction of directions) {
        const [x1, y1] = direction;

        for (let i = 1; i < 8; i++) {
          const Y = y + y1 * i;
          const X = x + x1 * i;
          //オセロを置くi個下の座標
          if (updatedBoard[y + y1 * i] === undefined) {
            //y座標の範囲外
            break;
          } else if (updatedBoard[Y][X] === undefined) {
            // x,y座標の範囲外
            break;
          } else if (updatedBoard[Y][X] === 0) {
            // 置いてない座標
            break;
          } else if (updatedBoard[Y][X] === turnColor) {
            console.log(12);
            // 置いたオセロと同じ色
            if (i > 1) {
              if (updatedBoard[Y][X] === updatedBoard[y + y1][x + x1]) {
                // // 周囲の座標の色と周囲の座標の周りの色
                break;
              } else {
                for (let s = i; s >= 0; s--) {
                  updatedBoard[y + y1 * s][x + x1 * s] = turnColor;
                }
                setTurnColor(3 - turnColor);
                setBoard(updatedBoard);
                for (let i = 0; i < 8; i++) {
                  for (let j = 0; j < 8; j++) {
                    if (updatedBoard[i][j] === 0) {
                      // 空のマスならば、次の手番で置けるかどうかを調べる
                      let canPlace = false;
                      for (const direction of directions) {
                        const [x1, y1] = direction;
                        let foundOpponent = false;
                        for (let k = 1; k < 8; k++) {
                          const newX = j + x1 * k;
                          const newY = i + y1 * k;

                          // オセロを置くマスが盤面外の場合、ループを終了
                          if (newX < 0 || newY < 0 || newX >= 8 || newY >= 8) break;
                          console.log(2);

                          if (updatedBoard[newY][newX] === 0 || updatedBoard[newY][newX] === 3) {
                            // 空のマスか3のマスの場合、置ける
                            if (updatedBoard[newY][newX] === 3) {
                              foundOpponent = true;
                              break;
                            }
                            break;
                          } else if (updatedBoard[newY][newX] !== turnColor) {
                            // 置いたオセロと同じ色の場合、逆算を終了
                            if (foundOpponent) {
                              canPlace = true;
                            }
                            break;
                          } else {
                            // 異なる色のオセロがある場合、次の方向を調べる
                            foundOpponent = true;
                          }
                        }
                        if (canPlace) break;
                      }
                      console.log(4);
                      if (canPlace) updatedBoard[i][j] = 3; // 置ける場所を3に設定
                    }
                  }
                }
              }
              break;
            }
          } else if (board[Y][X] === 3 - turnColor) {
            setBoard(newBoard);
            console.log(14);
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
                  className={styles.stonestyle}
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
