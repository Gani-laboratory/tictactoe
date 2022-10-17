import { useState } from "react";
import Board from "./components/Board";
import "./index.css";

function App() {
  const [state, setState] = useState({
    history: [
      {
        squares: Array(9).fill(null),
      }
    ],
    xIsNext: true,
    stepNumber: 0
  })

  const current = state.history[state.stepNumber]
  const winner = calculateWinner(current.squares)
  const moves = state.history.map((_, move) => {
    const desc = move ?
    `Go to move #${move}` :
    'Go to game start'
    return (
      <li key={move}>
        <button onClick={()=>setState({
          ...state,
          stepNumber: move,
          xIsNext: (move % 2) === 0
        })}>{move === state.stepNumber ? <b>{desc}</b> : desc}</button>
      </li>
    )
  })

  let status
  if (winner) {
    status = `Winner: ${winner}`
  } else if (current.squares.every((value) => value !== null)) {
    status = 'Draw!'
  } else {
    status = `Next Player: ${state.xIsNext ? 'X' : 'O'}`
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i)=>handleClick(state, setState, i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function handleClick(state, setState, i) {
  const history = state.history.slice(0, state.stepNumber + 1)
  const current = history[history.length - 1]
  const squares = current.squares.slice()
  if (calculateWinner(squares) || squares[i]) {
    return;
  }
  squares[i] = state.xIsNext ? 'X' : 'O';
  setState({
    history: history.concat([{
        squares,
    }]),
    stepNumber: history.length,
    xIsNext: !state.xIsNext
  })
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default App