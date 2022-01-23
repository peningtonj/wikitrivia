import Instructions from "./instructions";
import Game from "./game";
import React, { useState } from "react";


export default function Menu() {
    const [started, setStarted] = useState(false);
    const [mode, setMode] = useState("../temp.json");
    const [highscore, setHighscore] = React.useState<number>(
        Number(localStorage.getItem("highscore") ?? "0")
      );
    
    console.log(mode)
    if (!started) {
        return (
          <Instructions highscore={highscore} start={(mode) => {
              setStarted(true);
              setMode(mode);
            }} />
        );
      }
    
      console.log(mode)
    
    return (
        <Game 
        highscore={highscore}
        setHighscore={setHighscore}
        mode={mode}
        />
    )
}