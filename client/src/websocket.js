const socket = new WebSocket('ws://localhost:3001');

socket.onopen = () => {
  console.log('Connected to server');
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  switch (data.type) {
    case 'gameState':
      updateGameState(data.state);
      break;
    // Handle other message types here
    default:
      console.error('Unknown message type');
  }
};

function sendMove(playerId, characterName, move) {
  socket.send(JSON.stringify({
    type: 'move',
    playerId,
    characterName,
    move
  }));
}

function sendInitialization() {
  socket.send(JSON.stringify({ type: 'initialize' }));
}
