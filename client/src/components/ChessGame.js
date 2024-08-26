import React, { useState } from "react";
import "./ChessGame.css";

const initialBoard = [
  ["A-P1", "A-P2", "A-H1", "A-H2", "A-P3"],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["B-P1", "B-P2", "B-H1", "B-H2", "B-P3"],
];

function ChessGame() {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("A");
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [moveHistory, setMoveHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State to handle error messages
  const [winner, setWinner] = useState(null); // State to track the winner

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer("A");
    setSelectedPiece(null);
    setMoveHistory([]);
    setErrorMessage("");
    setWinner(null);
  };

  const handleCellClick = (rowIndex, colIndex) => {
    const piece = board[rowIndex][colIndex];
    if (piece && piece.startsWith(currentPlayer)) {
      setSelectedPiece({ piece, rowIndex, colIndex });
      setErrorMessage(""); // Clear any existing error message
    } else {
      setErrorMessage("Invalid selection! Please select one of your own pieces.");
    }
  };

  const checkWinner = () => {
    const opponent = currentPlayer === "A" ? "B" : "A";
    const opponentPieces = board.flat().filter((cell) => cell.startsWith(opponent));
    if (opponentPieces.length === 0) {
      setWinner(currentPlayer);
    }
  };

  const makeMove = (direction) => {
    if (!selectedPiece) {
      setErrorMessage("No piece selected! Please select a piece first.");
      return;
    }

    const { rowIndex, colIndex } = selectedPiece;
    let newRow = rowIndex;
    let newCol = colIndex;

    // Movement logic
    switch (direction) {
      case "L":
        newCol -= 1;
        break;
      case "R":
        newCol += 1;
        break;
      case "F":
        newRow -= 1;
        break;
      case "B":
        newRow += 1;
        break;
      case "FL":
        newRow -= 1;
        newCol -= 1;
        break;
      case "FR":
        newRow -= 1;
        newCol += 1;
        break;
      case "BL":
        newRow += 1;
        newCol -= 1;
        break;
      case "BR":
        newRow += 1;
        newCol += 1;
        break;
      default:
        return;
    }

    // Invalid move conditions
    if (newRow < 0 || newRow >= 5 || newCol < 0 || newCol >= 5) {
      setErrorMessage("Invalid move! The move would take the character out of bounds.");
      return;
    }

    const targetCell = board[newRow][newCol];

    if (targetCell.startsWith(currentPlayer)) {
      setErrorMessage("Invalid move! You cannot move onto a friendly character.");
      return;
    }

    const pieceType = selectedPiece.piece.split("-")[1];

    if (
      (pieceType === "P1" || pieceType === "P2" || pieceType === "P3") &&
      (direction === "FL" || direction === "FR" || direction === "BL" || direction === "BR")
    ) {
      setErrorMessage("Invalid move! Pawns cannot move diagonally.");
      return;
    }

    if ((pieceType === "H1" || pieceType === "H2") && (direction === "F" || direction === "B")) {
      setErrorMessage("Invalid move! Horses cannot move straight forward or backward.");
      return;
    }

    // Update board state
    const newBoard = [...board];
    newBoard[rowIndex][colIndex] = "";
    newBoard[newRow][newCol] = selectedPiece.piece;

    setBoard(newBoard);
    setMoveHistory([...moveHistory, `${selectedPiece.piece}: ${direction}`]);
    setSelectedPiece(null);
    setErrorMessage(""); // Clear any existing error message

    checkWinner();

    if (!winner) {
      setCurrentPlayer(currentPlayer === "A" ? "B" : "A");
    }
  };

  return (
    <div className="chess-game">
      {winner ? (
        <>
          <h2>Player {winner} wins!</h2>
          <button onClick={resetGame}>Start New Game</button>
        </>
      ) : (
        <>
          <h2>Current Player: {currentPlayer}</h2>
          <div className="board">
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="row">
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className={`cell ${
                      selectedPiece &&
                      selectedPiece.rowIndex === rowIndex &&
                      selectedPiece.colIndex === colIndex
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>} {/* Display error message */}
          {selectedPiece && (
            <div className="controls">
              <p>Selected: {selectedPiece.piece}</p>
              <div>
                <button onClick={() => makeMove("L")}>L</button>
                <button onClick={() => makeMove("R")}>R</button>
                <button onClick={() => makeMove("F")}>F</button>
                <button onClick={() => makeMove("B")}>B</button>
              </div>
              {selectedPiece.piece.includes("H2") && (
                <div>
                  <button onClick={() => makeMove("FL")}>FL</button>
                  <button onClick={() => makeMove("FR")}>FR</button>
                  <button onClick={() => makeMove("BL")}>BL</button>
                  <button onClick={() => makeMove("BR")}>BR</button>
                </div>
              )}
            </div>
          )}
          <h3>Move History</h3>
          <ul>
            {moveHistory.map((move, index) => (
              <li key={index}>{move}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ChessGame;

 

 

