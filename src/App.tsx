import React, { useMemo, useState, useCallback, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as D from "./data";
import { useInterval } from "./hooks/useInterval";

function App() {
  const minuteMarks = useMemo(
    () => new Array(48).fill(null).map(() => <li></li>),
    []
  );

  const digits = new Array(12)
    .fill(null)
    .map((any, hour) => <li>{hour + 1}</li>);

  const [secondsHandsRotate, setSecondsHandsRotate] = useState<number>(0);
  const [minutesHandsRotate, setMinutesHandsRotate] = useState<number>(0);
  const [hourHandsRotate, setHourHandsRotate] = useState<number>(0);

  const increaseRotateOnclick = useCallback(() => {
    const localSecond: number = D.getSecond();
    const rotate = localSecond * 6;
    setSecondsHandsRotate(rotate);

    const localMinite = D.getMinute();
    const rotateM = localMinite * 6 + Math.floor(localSecond / 10);
    setMinutesHandsRotate(rotateM);

    // alert(Math.floor(localSecond / 10));

    const localHour = D.getHour();
    const rotateH = localHour * 30;
    setHourHandsRotate(rotateH);
  }, []);

  useInterval(() => {
    const localSecond = D.getSecond();
    const rotate = localSecond * 6;
    setSecondsHandsRotate(rotate);

    const localMinite = D.getMinute();
    const rotateM = localMinite * 6 + Math.floor(localSecond / 10);
    setMinutesHandsRotate(rotateM);

    const localHour = D.getHour();
    const rotateH = localHour * 30 + (localMinite / 3) * 1.5;
    setHourHandsRotate(rotateH);
  });

  return (
    <div>
      <div id="watch">
        <div className="frame-face"></div>
        <ul className="minute-marks">{minuteMarks}</ul>
        <ul className="digits">{digits}</ul>
        <div
          className="hours-hand"
          style={{ transform: "rotate(" + hourHandsRotate + "deg)" }}
        ></div>
        <div
          className="minutes-hand"
          style={{ transform: "rotate(" + minutesHandsRotate + "deg)" }}
        ></div>
        <div
          className="seconds-hand"
          style={{ transform: "rotate(" + secondsHandsRotate + "deg)" }}
        ></div>
      </div>
      <div>
        <button onClick={increaseRotateOnclick}>increaseRotate</button>
      </div>
    </div>
  );
}

export default App;
