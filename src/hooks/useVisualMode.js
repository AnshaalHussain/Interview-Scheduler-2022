import { useState, useEffect } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState();
  const [history, setHistory] = useState([initial]);

  useEffect(() => {
    setMode(initial);
  }, [initial]);

  const transition = (transitionMode, replace = false) => {
    setMode(transitionMode);
    let newHistory = history;
    if (replace) {
      newHistory.pop();
    }
    newHistory.push(transitionMode);
    setHistory(newHistory);
  };

  const back = () => {
    let newHistory = history;
    newHistory.pop();
    setMode(newHistory[newHistory.length - 1]);
  };

  return { mode, transition, back };
}
