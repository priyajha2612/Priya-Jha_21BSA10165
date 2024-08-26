# Priya-Jha_21BSA10165

##Turn-based Chess-like Game with Websocket Communication 

###Objective

####Develop a turn-based chess-like game with a server-client architecture, utilizing websockets for real-time communication and a web-based user interface. 
###Components 
1. Server 
Implement the game logic in any server-side language of your choice. 
Set up a websocket server to handle real-time communication with clients. 
Process game moves and maintain the game state.

3. Websocket Layer 
Implement a websocket communication layer between the server and clients. 
Handle events for game initialization, moves, and state updates. 

3. Web Client 
Create a web-based user interface to display the game board and controls. 
Implement websocket communication with the server. 
Render the game state and provide interactive controls for players.

##Game Rules

###Game Setup 

The game is played between two players on a 5x5 grid. 
Each player controls a team of 5 characters, which can include Pawns, Hero1, and Hero2. 
Players arrange their characters on their respective starting rows at the beginning of the game. 

 

Characters and Movement 

There are three types of characters available: 

 ###1. Pawn: 
Moves one block in any direction (Left, Right, Forward, or Backward). 
Move commands: L (Left), R (Right), F (Forward), B (Backward) 

2. Hero1: 
Moves two blocks straight in any direction. 
Kills any opponent's character in its path. 
Move commands: L (Left), R (Right), F (Forward), B (Backward) 

###3. Hero2: 
Moves two blocks diagonally in any direction. 
Kills any opponent's character in its path. 
Move commands: FL (Forward-Left), FR (Forward-Right), BL (Backward-Left), BR (Backward-Right) 
All moves are relative to the player's perspective. 

###Move command format: 
For Pawn and Hero1: <character_name>:<move> (e.g., P1:L, H1:F) 
For Hero2: <character_name>:<move> (e.g., H2:FL, H2:BR) 

##Game Flow 

###Initial Setup: 
Players deploy all 5 characters on their starting row in any order. 
Character positions are input as a list of character names, placed from left to right. 
Players can choose any combination of Pawns, Hero1, and Hero2 for their team. 

Turns: 
Players alternate turns, making one move per turn. 

###Combat: 
If a character moves to a space occupied by an opponent's character, the opponent's character is removed from the game. 
For Hero1 and Hero2, any opponent's character in their path is removed, not just the final destination. 

###Invalid Moves: 

Moves are considered invalid if: a. The specified character doesn't exist. b. The move would take the character out of bounds. c. The move is not valid for the given character type. d. The move targets a friendly character. 
Players must retry their turn if they input an invalid move. 

###Game State Display: 
After each turn, the 5x5 grid is displayed with all character positions. 
Character names are prefixed with the player's identifier and character type (e.g., A-P1, B-H1, A-H2). 

###Winning the Game: 
The game ends when one player eliminates all of their opponent's characters. 
The winning player is announceSd, and players can choose to start a new game. 


Technical Requirements 

Server 

Implement the core game logic as described in the original rules. 
Set up a websocket server to handle client connections and game events. 
Process move commands received from clients and update the game state accordingly. 
Broadcast updated game state to all connected clients after each valid move. 

Websocket Communication 

Implement the following event types: 
Game initialization 
Player move 
Game state update 
Invalid move notification 
Game over notification 

Web Client 

Create a responsive web page that displays: 
A 5x5 grid representing the game board 
Current game state with characters positioned on the board 

Player turn indication 

Move history (Optional) 

Implement interactive features: 

Clickable character pieces for the current player 
Display valid moves as buttons when a character is selected below the grid. 
Send move commands to the server when a valid move is chosen 
Handle and display server responses, including invalid move notifications and game over states.

User Interface Requirements

Display the 5x5 game board with clear differentiation between empty cells and character positions. 
Use distinct visual representations for each player's characters (e.g., different colors or prefixes as in the original requirements). 
When a player selects their character, highlight valid move options as clickable buttons below the game board. 
Show the current player's turn prominently. 
Display a move history or log. 
Implement a game over screen showing the winner and offering an option to start a new game. 

Implementation Steps 

Set up the server with the core game logic. 
Implement the websocket server and define the communication protocol. 
Create the web client interface with any web framework. 
Implement websocket communication in the client. 
Integrate the game logic with the websocket layer on the server. 

Develop the interactive features of the web client. 
Implement game state rendering and updates on the client side. 
Add final touches such as move validation, game over conditions, and the option to start a new game. 
Bonus Challenges 

Implement additional character types with unique move patterns. 
Add Hero3: 
Movement: Moves 2 steps straight and one to the side in a single turn. 
Attack: Kills only the character at its final landing position (if occupied by an opponent). 

Move commands: 
FL: 2 steps Forward, 1 step Left 
FR: 2 steps Forward, 1 step Right 
BL: 2 steps Backward, 1 step Left 
BR: 2 steps Backward, 1 step Right 
RF: 2 steps Right, 1 step Forward 
RB: 2 steps Right, 1 step Backward 
LF: 2 steps Left, 1 step Forward 
LB: 2 steps Left, 1 step Backward 

Example moves: H3:FR (2 front, 1 right), H3:RF (2 right, 1 front) 
Implement a dynamic team composition feature: 
Allow players to choose their team composition at the start of each game. 
Ensure the game logic can handle any combination of character types. 
Add a spectator mode for other clients to watch ongoing games. 
Implement a chat feature for players to communicate during the game. 
Create an AI opponent that can play the game using basic strategy. 
Implement a replay system that allows players to review past games move by move. 
Add a ranking system that tracks player performance across multiple games

