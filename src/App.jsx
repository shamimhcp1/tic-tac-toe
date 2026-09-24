import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      className="bg-white border border-grey-400 h-12 w-12 m-1 leading-9 text-lg"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ isNextValueX, squares, onPlay }) {
  const winner = calculateWinner(squares);
  const isDraw = calculateDraw(squares);

  let status;

  // Check if there is a winner || draw
  if (winner) {
    status = `Winner: ${winner}`;
  } else if(isDraw) {
    status = "Draw";
  } else {
    status = `Next Player: ${isNextValueX ? "X" : "O"}`;
  }

  function handleClick(i) {
    // Check if the square is already filled || there is a winner || there is a draw
    if (squares[i] || winner || isDraw) {
      return;
    }

    // Create a copy of the array
    const nextSquares = squares.slice();

    // Update the square
    if (isNextValueX) {
      nextSquares[i] = "X";
    } else nextSquares[i] = "O";

    // Update the state
    onPlay(nextSquares);
  }

  return (
    <>
      <h1 className="font-bold text-lg p-1">{status}</h1>
      <div className="flex">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="flex">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="flex">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}


export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [isNextValueX, setNextValueX] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    setNextValueX(!isNextValueX);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setNextValueX(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button
          className="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ..."
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="font-bold text-3xl p-1 underline underline-offset-4">Tic Tac Toe</h1>
      <div className="flex justify-center gap-8">
        <div>
          <Board
            isNextValueX={isNextValueX}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold text-lg p-1">History</h1>
          <ol className="border border-grey-400 p-2">{moves}</ol>
        </div>
      </div>
    </div>
  );
}

// Check if there is a winner
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

// Check if there is a draw
function calculateDraw(squares) {
  return !squares.includes(null);
}
