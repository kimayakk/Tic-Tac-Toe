import React from "react";

function WinnerScreen({restartGame,playerWon}){
    return(
        <div className="winner">
         <h2 className="congo">
         {
            playerWon=="No One"?"Oops It's s draw":"Congratulations!"
         }</h2>
         <h3 className="player">
         {playerWon} Won The Game
         </h3>
         <button onClick={restartGame}>
         Restart</button>
        </div>
    )
}

export default WinnerScreen