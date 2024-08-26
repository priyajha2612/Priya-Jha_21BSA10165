const express = require('express'); 

const http = require('http'); 

const WebSocket = require('ws'); 

const Chess = require('chess.js').Chess; 

 

const app = express(); 

const server = http.createServer(app); 

const wss = new WebSocket.Server({ server }); 

 

const game = new Chess(); 

 

wss.on('connection', (ws) => { 

    ws.on('message', (message) => { 

        const { type, data } = JSON.parse(message); 

 

        switch (type) { 

            case 'move': 

                const { from, to, playerColor } = data; 

 

                // Validate and make the move 

                if (game.turn() === playerColor[0] && game.move({ from, to })) { 

                    // Broadcast the updated game state to all clients 

                    broadcastGameState(); 

                } else { 

                    // Send an error message if the move is invalid 

                    ws.send(JSON.stringify({ type: 'error', message: 'Invalid move' })); 

                } 

                break; 

            case 'reset': 

                game.reset(); 

                broadcastGameState(); 

                break; 

        } 

    }); 

 

    // Send the initial game state to the newly connected client 

    ws.send(JSON.stringify({ 

        type: 'init', 

        data: { 

            board: game.board(), 

            turn: game.turn(), 

            game_over: game.game_over(), 

            checkmate: game.in_checkmate(), 

            stalemate: game.in_stalemate(), 

            draw: game.in_draw() 

        } 

    })); 

}); 

 

const broadcastGameState = () => { 

    const gameState = { 

        type: 'update', 

        data: { 

            board: game.board(), 

            turn: game.turn(), 

            game_over: game.game_over(), 

            checkmate: game.in_checkmate(), 

            stalemate: game.in_stalemate(), 

            draw: game.in_draw() 

        } 

    }; 

 

    wss.clients.forEach((client) => { 

        if (client.readyState === WebSocket.OPEN) { 

            client.send(JSON.stringify(gameState)); 

        } 

    }); 

}; 

 

server.listen(3000, () => { 

    console.log('Server is listening on port 3000'); 

}); 

 

 

 

 

 

 

 

 

 