import React, { useEffect, useState, useCallback } from 'react'

import { Link, useParams, useNavigate } from "react-router-dom";
import { CanvasWrapper, Inspector } from '../components/R3f/ThreeStyle';
import { debounce, throttle } from 'lodash';
import Scene03 from '../components/R3f/Scene03';
import Scene02 from '../components/R3f/Scene02';
import Scene01 from '../components/R3f/Scene01';


const ThreeWeb = () => {
  let params = useParams();


  const [mouse, setMouse] = useState({
    X: 0,
    Y: 0,
    deltaX: 0,
    deltaY: 0,
  })

  const [touchDeltaX, setTouchDeltaX] = useState(0)
  const [touchDeltaY, setTouchDeltaY] = useState(0)
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  const [positionZ, setPositionZ] = useState(0)
  const [rotX, setRotX] = useState(0)
  const [rotY, setRotY] = useState(0)
  const [rotZ, setRotZ] = useState(0)

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      //cleanup
      window.removeEventListener("resize", handleResize);
    }
  }, []);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const handleResize = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }, 1000)

  const TouchControlPosition = useCallback(throttle((e) => {
    let AdjustMouseX = e.touches[0].clientX - windowSize.width / 2
    let AdjustMouseY = e.touches[0].clientY - windowSize.height / 2
    setTouchDeltaX((prev) => e.touches[0].clientX - prev)
    setTouchDeltaY((prev) => e.touches[0].clientY - prev)

    setMouse({
      X: AdjustMouseX,
      Y: AdjustMouseY,
      deltaX: setTouchDeltaX,
      deltaY: setTouchDeltaY,
    })
    Interaction()

  }, 200), [mouse]);

  const controllPosition = useCallback(throttle((e) => {
    let AdjustMouseX = e.clientX - windowSize.width / 2
    let AdjustMouseY = e.clientY - windowSize.height / 2
    setMouse({
      X: AdjustMouseX,
      Y: AdjustMouseY,
      deltaX: e.movementX,
      deltaY: e.movementY,
    })
    Interaction()
  }, 200), [mouse]);


  const Interaction = () => {
    let targetX = mouse.X * 0.005
    let targetY = mouse.Y * 0.005

    setRotX((prev) => prev += 0.1 * (targetY - prev))
    setRotY((prev) => prev += 0.1 * (targetX - prev))
  }



  return (
    <CanvasWrapper position="relative" width="100%" height="100%" onTouchMove={TouchControlPosition} onMouseMove={controllPosition} >
      <Inspector>
        <div>
          <h2>
            W: {windowSize.width}<br />
            H: {windowSize.height}
          </h2>
          <div>
            <h1>Scene List</h1>
            <div>
              <ul>
                <li id='scene01'>
                  <Link to={`/threeJS/scene01`}>
                    <p>01</p>
                  </Link></li>
                <li id='scene02'>
                  <Link to={`/threeJS/scene02`}>
                    <p>02</p>
                  </Link></li>
                <li id='scene03'>
                  <Link to={`/threeJS/scene03`}>
                    <p>03</p>
                  </Link>
                </li>
                <li><p>04</p></li>
              </ul>
            </div>
          </div>
        </div>
      </Inspector>
      <>
        {
          {
            'scene01': <Scene01 rotY={rotY} />,
            'scene02': <Scene02 rotY={rotY} />,
            'scene03': <Scene03 />,
          }[params.sceneNo]
        }
      </>




    </CanvasWrapper >
  );
};

export default React.memo(ThreeWeb);
