import React, { useState } from "react";
import { GameState } from "../types/game";
import { Item } from "../types/item";
import createState from "../lib/create-state";
import Board from "./board";
import Loading from "./loading";

interface Props {
  highscore: number;
  setHighscore: (score: number) => void;
  mode: string;
}

export default function Game(props: Props) {
  console.log("Game")
  const { highscore, setHighscore, mode } = props;
  const [state, setState] = useState<GameState | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState<Item[] | null>(null);

  React.useEffect(() => {
    const fetchGameData = async () => {
      let data = null
      if (mode === "test") {
        data = require("../test.json");
      }
      if (mode === "cccc") {
        data = require("../cccc_batting.json");
      }
      const items: Item[] = data.data
      setItems(items);
    };

    fetchGameData();
  }, []);

  React.useEffect(() => {
    (async () => {
      if (items !== null) {
        setState(await createState(items));
        setLoaded(true);
      }
    })();
  }, [items]);

  const resetGame = React.useCallback(() => {
    (async () => {
      if (items !== null) {
        setState(await createState(items));
      }
    })();
  }, [items]);


  const updateHighscore = React.useCallback((score: number) => {
    localStorage.setItem("highscore", String(score));
    setHighscore(score);
  }, []);

  if (!loaded || state === null) {
    return <Loading />;
  }


  return (
    <Board
      highscore={highscore}
      state={state}
      setState={setState}
      resetGame={resetGame}
      updateHighscore={updateHighscore}
    />
  );
}
