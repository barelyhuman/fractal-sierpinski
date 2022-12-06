import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import "./app.css";



function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const basePoints = [
  {x: random(0,window.innerWidth), y:random(0,window.innerHeight/2) },
  {x: random(0,window.innerWidth), y:random(window.innerHeight/2,window.innerHeight) },
  {x: random(0,window.innerWidth), y:random(window.innerHeight/2,window.innerHeight) },
];

export function App() {
  const [points, setPoints] = useState([]);
  const prevPoint = useRef();

  const allPoints = [].concat(basePoints, points);

  useEffect(() => {
    const id = setInterval(() => {
      if (points.length >= 11000) {
        clearInterval(id);
      }
      const randomBasePoint = basePoints[random(0, 2)];
      if (!prevPoint?.current) {
        prevPoint.current = {
          x: random(0, window.innerWidth),
          y: random(0, window.innerHeight),
        };
      }
      const point = {
        x: (randomBasePoint.x + prevPoint.current.x) / 2,
        y: (randomBasePoint.y + prevPoint.current.y) / 2,
      };
      setPoints(points.concat(point));
      prevPoint.current = point;
    }, 60);

    return () => clearInterval(id);
  }, [points]);

  return (
    <>
      <div>
        {allPoints.map((point) => (
          <div
            className="dot"
            style={{
              top: point.y + "px",
              left: point.x + "px",
            }}
          ></div>
        ))}
      </div>
    </>
  );
}
