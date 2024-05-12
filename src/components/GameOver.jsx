export default function GameOver({winner,onRestart}){
    return (<div id = "game-over">
        <h2>
            Game Over! 😊
        </h2>
        {winner && <p>{winner} Won</p>}
        {!winner && <p>{winner} Its a Draw </p>}
{/* pass a function from outside to this component to the button  */}
        <p><button onClick={onRestart}>Rematch !</button></p>
    </div>)
}