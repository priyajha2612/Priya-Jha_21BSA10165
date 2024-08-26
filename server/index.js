// server/index.js
const WebSocket = require('ws');
const { getBoard, makeMove, selectPiece, getMoveHistory } = require('./gameLogic');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('New connection established');

  // Send initial board state and move history to the client
  ws.send(JSON.stringify({
    type: 'INITIAL_STATE',
    board: getBoard(),
    moveHistory: getMoveHistory()
  }));

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'SELECT':
        const selectResult = selectPiece(data.rowIndex, data.colIndex, data.currentPlayer);
        if (selectResult.success) {
          ws.send(JSON.stringify({ type: 'SELECT', piece: selectResult.piece }));
        } else {
          ws.send(JSON.stringify({ type: 'ERROR', message: selectResult.message }));
        }
        break;

      case 'MOVE':
        const moveResult = makeMove(data.direction, data.rowIndex, data.colIndex, data.currentPlayer);
        if (moveResult.success) {
          ws.send(JSON.stringify({
            type: 'BOARD',
            board: moveResult.board,
            moveHistory: moveResult.moveHistory
          }));
          ws.send(JSON.stringify({ type: 'NEXT_PLAYER', player: moveResult.nextPlayer }));
        } else {
          ws.send(JSON.stringify({ type: 'ERROR', message: moveResult.message }));
        }
        break;

      default:
        ws.send(JSON.stringify({ type: 'ERROR', message: 'Unknown message type' }));
    }
  });

  ws.on('close', () => {
    console.log('Connection closed');
  });
});


