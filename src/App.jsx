import { useState } from "react";
import Player from "./components/Player"
import GameBoard from "./components/GameBoard"; 
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";
const initialGameBoard =[
  [null,null,null],
  [null,null,null],
  [null,null,null],
]

// helper function :- no need access to state , and not recreated when componet rewxcuted
function deriveActivePlayer(gameTurns){
  let currentPlayer ='X';
      if(gameTurns.length > 0 && gameTurns[0].player ==='X'){
        currentPlayer ='O';
      }
      return currentPlayer;
}

function App() {
  const [players, setPlayer] = useState({
    'X': 'Player 1',
    'O': 'Player 2',
  });

  const [gameTurns, setGameTurns]=useState([]);
  // const [activePlayer, setActivePlayer ] =useState('X');/ dont need 

  const activePlayer = deriveActivePlayer(gameTurns);
//deep copy every inner array we create copy of an array
  let gameBoard =[...initialGameBoard.map(array=>[...array])];

    for(const turn of gameTurns){
        const{square, player} =turn;
        const {row,col} =square;
//overwriting inner ele in nesed array in another array
        gameBoard[row][col] =player;
    }


  // check winner from gameTurns
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =gameBoard[combination[2].row][combination[2].column];
    // WINNER cond
    if(firstSquareSymbol  && firstSquareSymbol===secondSquareSymbol &&  firstSquareSymbol === thirdSquareSymbol){
       winner = players[firstSquareSymbol];
    }

  }
//draw no one win 
const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex,colIndex){
    // setActivePlayer((curActivePalyer)=> curActivePalyer === 'X' ? 'O' : 'X' );
    setGameTurns(prevTurns => {
     const currentPlayer =deriveActivePlayer(prevTurns);
      const updatedTurns = [{square : {row: rowIndex,col : colIndex},player:currentPlayer},...prevTurns];
      return updatedTurns;
    });
  }
  
  //function to resatart game 
  function handleRestart(){
    
    setGameTurns([]);
  }

  // getting player name 
  function handlePlayernameChanged(symbol,newName){
    setPlayer(prevPlayers => {
      return{
        ...prevPlayers,
        [symbol] : newName
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        {/* //Players */}
        <ol id= 'players' className="highlight-player"> 
        <Player initialName = "Player 1" symbol = "X" isActive={activePlayer ==='X'} onChangename ={handlePlayernameChanged}
        />
        <Player initialName = "Player 2" symbol = "O"isActive={activePlayer ==='O'} onChangename ={handlePlayernameChanged}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        {/* //Game Board */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      {/* LOG */}
        <Log turns={gameTurns}/>
    </main>
  );
}

export default App
