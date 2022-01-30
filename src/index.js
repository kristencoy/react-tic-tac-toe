import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board(props) {
  const renderSquare = function (i) {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  };

  console.log(props.squares);

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  const [state, setState] = useState({
    squares: Array(9).fill(null),
    xIsNext: true,
  });

  const handleClick = (i) => {
    const _squares = state.squares.slice();
    if (calculateWinner(_squares) || _squares[i]) {
      return;
    }
    _squares[i] = state.xIsNext ? "X" : "O";
    setState({ squares: _squares, xIsNext: !state.xIsNext });
  };

  const winner = calculateWinner(state.squares);
  let status;
  if (winner) {
    status = winner + " wins!";
  } else {
    status = "It's " + (state.xIsNext ? "X" : "O") + "'s turn.";
  }

  const resetBoard = () => {
    setState({
      squares: Array(9).fill(null),
      xIsNext: true,
    });
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={state.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
        <button className="button" onClick={resetBoard}>
          Restart
        </button>
      </div>
    </div>
  );
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
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
