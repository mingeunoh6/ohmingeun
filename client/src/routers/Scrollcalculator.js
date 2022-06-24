import { React, useState, useEffect } from "react";
import { useScroll } from "../hooks/useScroll";
import { ScrollArea } from "../style/Scrollcalculator";

function MousePosition() {
  const [x, setX] = useState();
  const [y, setY] = useState();

  useEffect(() => {
    const update = (e) => {
      setX(e.x);
      setY(e.y);
    };
    window.addEventListener("mousemove", update);
    window.addEventListener("touchmove", update);
    return () => {
      window.removeEventListener("mousemove", update);
      window.removeEventListener("touchmove", update);
    };
  }, [x, y]);

  return (
    <div>
      <h1>Mouse Data</h1>
      <h2>x:{x}</h2>
      <h2>y:{y}</h2>
    </div>
  );
}

function MouseScroll() {
  const { scrollY } = useScroll();

  return (
    <div>
      <div>
        <h2>ScrollY: {scrollY}</h2>
      </div>
    </div>
  );
}

const Scrollcalculator = () => {
  return (
    <>
      <ScrollArea>
        <div id="mousePos">
          <MousePosition />

          <MouseScroll />
        </div>
      </ScrollArea>
    </>
  );
};

export default Scrollcalculator;
