import Quiz from "../quiz/Quiz";
import React, { useState, useEffect } from "react";

function Timer(props) {
  const [seconds, setSeconds] = useState(60);
  const [counter, setCounter] = useState(0);

  let time = setTimeout(() => {
    if (seconds === 0 || counter !== props.count) {
      if (counter === props.count) {
        props.func(counter+1)
        
      }
      clearTimeout(time);
      setSeconds(60);
      setCounter(props.count);
    } else setSeconds(seconds - 1);
  }, 1000);

  return <div>{seconds}</div>;
}

export default Timer;
