import { useState } from "react";
import Board from "./Board";

function Game() {
  const [state, setState] = useState({
    history: [
      {
        squares: Array(9).fill(null),
        coordinate: Array(2).fill(null),
      },
    ],
    xIsNext: true,
    stepNumber: 0,
    isDescending: false,
  });

  const current = state.history[state.stepNumber];
  const winner = calculateWinner(current.squares);
  const moves = state.history.map((_, move) => {
    const desc = move ? `#${move} Move @ ${_.coordinate}` : "Game start";
    return (
      <li key={move}>
        <button
          onClick={() =>
            setState({
              ...state,
              stepNumber: move,
              xIsNext: move % 2 === 0,
            })
          }
        >
          {move === state.stepNumber ? <b>{desc}</b> : desc}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `Winner: ${winner.winner}`;
  } else if (current.squares.every((value) => value !== null)) {
    status = "Draw!";
  } else {
    status = `Next Player: ${state.xIsNext ? "X" : "O"}`;
  }

  function sortHistory() {
    setState({
      ...state,
      isDescending: !state.isDescending,
    });
  }

  function handleClick(i) {
    const horizontal = Array(3).fill(null);
    const vertical = Array(3).fill(null);
    const generateCoordinate = [];
    horizontal.map((_, x) => {
      return vertical.map((_, y) => {
        generateCoordinate.push([x + 1, y + 1]);
        return _;
      });
    });

    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const coordinate = generateCoordinate[i];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? "X" : "O";
    setState({
      history: history.concat([
        {
          squares,
          coordinate,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
    });
  }

  return (
    <div className="flex justify-center items-center gap-5 h-full absolute w-full">
      <div>
        <Board squares={current.squares} onClick={(i) => handleClick(i)} winner={winner ? winner.lines : false} />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <button className="p-3 rounded-full bg-slate-300" onClick={() => sortHistory()}>
            {state.isDescending ? "Ascending" : "Descending"}
          </button>
          <div>{status}</div>
        </div>
        <ol>{state.isDescending ? moves.reverse() : moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const line = Array(3).fill(null);
  const lines = Array(8)
    .fill(null)
    .map((_, x) => {
      return line.map((_, y) => {
        if (x < 3) {
          return 3 * x + y;
        } else if (x < 6) {
          if (x !== 3) {
            return 3 * y + (x === 4 ? 1 : 2);
          }
          return 3 * y;
        } else if (x < 7) {
          return (x % 2) + y * 2 * 2;
        }
        return ((x - 1) % 2) + (y + 1) * 2;
      });
    });

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        lines: lines[i],
      };
    }
  }
  return null;
}

export default Game;
