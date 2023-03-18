
import { useEffect, useState } from 'react';
import './App.css';
import Square from"./Component/Square";
import { Patterns } from './Patterns';
import WinnerScreen from './Component/WinnerScreen';

function App() {
  const [board,setBoard]=useState(["","","","","","","","",""]);
  const[player,setPlayer]=useState("⭕");
  const [result,setResult]=useState({winner:"none",state:"none"});
  const[wined,setWin]=useState(false);

  const handleClick=(square)=>{
    clickPlay()
   setBoard(
    board.map((val,idx)=>{
      if(idx==square && val==""){
        return player;
      }
      return val;
    })
   );
  }

  useEffect(()=>{
    checkWin()
    checkIfTie()
    if(player=="❌")
    {
      setPlayer("⭕")
    }
    else{
      setPlayer("❌")
    }
  },[board]);

  useEffect(()=>{
  
    if(result.state!="none")
    {   setWin(true);
      gameWinner();
      // alert(`Game Finished! Winning PLayer:${result.winner}`)
    }
  },[result]);

  const checkWin=()=>{
    Patterns.forEach((currPattern)=>{
      const firstPlayer=board[currPattern[0]];
      if(firstPlayer=="") return;

      let foundWinningPattern=true;
      currPattern.forEach((idx)=>{
         if(board[idx]!=firstPlayer)
         {
          foundWinningPattern=false;
         }
      });

      if(foundWinningPattern)
      {
        setResult({winner:player,state:"Won"});
        // gameWinner();
      }
    })
  }

  const restartGame = () => {
    gameRestart()
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("❌");
    setWin(false)
  };

  const checkIfTie=()=>{
    let filled=true;
    board.forEach((square)=>{
      if(square=="")
      {
        filled=false;
      }
    });
    if(filled)
    {
      setResult({winner:"No One",state:"Tie"})
    }
  }

  const click = new Audio('./click.mp3')
  const gameWinnerSound = new Audio('./win.wav')
  const restartSound = new Audio('./restart.wav')
  const clickPlay=()=>{
    click.play()
  }

  const gameWinner=()=>{
    gameWinnerSound.play()
  }

  const gameRestart=()=>{
   restartSound.play()
  }
  return (
    <div className="App">
    
      <div className='board'>
      <h1 className='title'>Let's Play<br/>Tic-Tac-Toe</h1>
      <div className='row'>
      <Square 
      chooseSquare={()=>{handleClick(0)}}
      val={board[0]}/>
      <Square
      chooseSquare={()=>{handleClick(1)}}
      val={board[1]}/>
      <Square
      chooseSquare={()=>{handleClick(2)}}
      val={board[2]}/>
      </div>
      <div className='row'>
      <Square
      chooseSquare={()=>{handleClick(3)}}
      val={board[3]}/>
      <Square
      chooseSquare={()=>{handleClick(4)}}
      val={board[4]}/>
      <Square
      chooseSquare={()=>{handleClick(5)}}
      val={board[5]}/>
      </div>
      <div className='row'>
      <Square
      chooseSquare={()=>{handleClick(6)}}
      val={board[6]}/>
      <Square
      chooseSquare={()=>{handleClick(7)}}
      val={board[7]}/>
      <Square
      chooseSquare={()=>{handleClick(8)}}
      val={board[8]}/>
      </div>
      
      </div><br/>
      {wined ? <WinnerScreen restartGame={restartGame} playerWon={result.winner} /> : null}
    </div>
  );
}

export default App;
