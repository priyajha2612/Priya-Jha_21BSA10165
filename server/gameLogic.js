// server/gameLogic.js

let board = [
    ["A-P1", "A-P2", "A-H1", "A-H2", "A-P3"],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["B-P1", "B-P2", "B-H1", "B-H2", "B-P3"],
  ];
  
  let moveHistory = {
    A: [],
    B: []
  };
  
  const getBoard = () => {
    return board;
  };
  
  const getMoveHistory = () => {
    return moveHistory;
  };
  
  const makeMove = (direction, rowIndex, colIndex, currentPlayer) => {
    const piece = board[rowIndex][colIndex];
    if (!piece || !piece.startsWith(currentPlayer)) {
      return { success: false, message: 'Invalid move' };
    }
  
    let newRow = rowIndex;
    let newCol = colIndex;
    const pieceType = piece.split("-")[1];
    const moveDistance = pieceType === "H1" || pieceType === "H2" ? 2 : 1;
  
    switch (direction) {
      case "L":
        newCol += (currentPlayer === "A" ? -1 : 1) * moveDistance;
        break;
      case "R":
        newCol += (currentPlayer === "A" ? 1 : -1) * moveDistance;
        break;
      case "F":
        newRow += (currentPlayer === "A" ? -1 : 1) * moveDistance;
        break;
      case "B":
        newRow += (currentPlayer === "A" ? 1 : -1) * moveDistance;
        break;
      case "FL":
        if (pieceType === "H2") {
          newRow += (currentPlayer === "A" ? -1 : 1) * moveDistance;
          newCol += (currentPlayer === "A" ? -1 : 1) * moveDistance;
        }
        break;
      case "FR":
        if (pieceType === "H2") {
          newRow += (currentPlayer === "A" ? -1 : 1) * moveDistance;
          newCol += (currentPlayer === "A" ? 1 : -1) * moveDistance;
        }
        break;
      case "BL":
        if (pieceType === "H2") {
          newRow += (currentPlayer === "A" ? 1 : -1) * moveDistance;
          newCol += (currentPlayer === "A" ? -1 : 1) * moveDistance;
        }
        break;
      case "BR":
        if (pieceType === "H2") {
          newRow += (currentPlayer === "A" ? 1 : -1) * moveDistance;
          newCol += (currentPlayer === "A" ? 1 : -1) * moveDistance;
        }
        break;
      default:
        return { success: false, message: 'Invalid direction' };
    }
  
    if (newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 5) {
      const targetPiece = board[newRow][newCol];
      if (!targetPiece || !targetPiece.startsWith(currentPlayer)) {
        board[rowIndex][colIndex] = "";
        board[newRow][newCol] = piece;
  
        moveHistory[currentPlayer].push({ piece, from: [rowIndex, colIndex], to: [newRow, newCol] });
  
        return { success: true, board, moveHistory, nextPlayer: currentPlayer === "A" ? "B" : "A" };
      }
    }
  
    return { success: false, message: 'Move out of bounds or blocked' };
  };
  
  const selectPiece = (rowIndex, colIndex, currentPlayer) => {
    const piece = board[rowIndex][colIndex];
    if (piece && piece.startsWith(currentPlayer)) {
      return { success: true, piece, rowIndex, colIndex };
    }
    return { success: false, message: 'Invalid piece selection' };
  };
  
  module.exports = { getBoard, makeMove, selectPiece, getMoveHistory };
  
  

  
  





