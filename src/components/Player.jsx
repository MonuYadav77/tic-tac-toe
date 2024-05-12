import { useState } from "react"
export default function Player({initialName, symbol, isActive,onChangename}){
    const [playerName,setplayerName]=useState(initialName);
    const [isEditing, setIsEditing] =useState(false);
    function handleEditClick () {
        setIsEditing((editing) =>!editing);
        if(isEditing){

            onChangename(symbol,playerName);
        }
    }

    function handleChange(event){
        setplayerName(event.target.value);
        
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    // let buttonCaption = 'save';
    if(isEditing){
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>;
    }
    return(
        <li className={isActive ? 'active' : undefined}>
            <span className="player">{editablePlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            {/* edit button */}
            <button onClick={handleEditClick}>{isEditing ? 'save' : 'edit'}</button>
          </li>
    );
}