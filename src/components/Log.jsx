
// And the idea behind this log component here is in the end that it's simply outputs an ordered list
export default function Log({turns}){
    return <ol id="log">
{/* so that we can simply see which turns
were taken by the different players
whilst playing that game. */}
    {turns.map(turn => <li key ={`${turn.square.row} ${turn.square.col}`}>{turn.player} selected {turn.square.row},{turn.square.col}</li>)}
    </ol>
}