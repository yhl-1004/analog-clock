import React, { useMemo, useState, useCallback, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as D from "./data";
import { useInterval } from "./hooks/useInterval";

function App() {
  // const minuteMarks = useMemo(
  //   () => new Array(48).fill(null).map(() => <li></li>),
  //   []
  // );

  const digits = new Array(12)
    .fill(null)
    .map((any, hour) => <li>{hour + 1}</li>);

  const [secondsHandsRotate, setSecondsHandsRotate] = useState<number>(0);
  const [minutesHandsRotate, setMinutesHandsRotate] = useState<number>(0);
  const [hourHandsRotate, setHourHandsRotate] = useState<number>(0);

  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

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

    setHour(localHour);
    setMinute(localMinite);
    setSeconds(localSecond);
  }, 1000);

  return (
    <div>
      <div id="watch">
        <div className="frame-face"></div>
        <div className="digital-wrap">
          <ul className="digit-hours">{hour}</ul>
          <ul className="digit-minutes">{minute}</ul>
          <ul className="digit-seconds">{seconds}</ul>
        </div>
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
    </div>
  );
}

export default App;
