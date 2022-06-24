import React, { useCallback, useState, useEffect, useRef } from "react";

import styled from "@emotion/styled";
import { throttle, debounce } from "lodash";

const ControllerWrapper = styled.div`
  position: absolute;
  z-index: 999;
  bottom: 10px;
  right: 10px;
  width: 300px;
  height: 300px;
  border: 1px solid red;
  color: white;
  & .controlKey {
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 100px;
    height: 100px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid yellow;
    &:hover {
      cursor: pointer;
      background-color: green;
    }
    p {
      margin: 0;
      vertical-align: center;
      text-align: center;
      pointer-events: none;
    }
  }
  .goFoward {
    top: 0;
    right: 50%;
    transform: translateX(50%);
  }

  .goBackward {
    bottom: 0;
    right: 50%;
    transform: translateX(50%);
  }
  .goLeft {
    bottom: 50%;
    left: 0%;
    transform: translateY(50%);
  }
  .goRight {
    bottom: 50%;
    right: 0%;
    transform: translateY(50%);
  }
`;

const Controller = (props) => {
  const [keyActive, setKeyActive] = useState(false)
  const intervalRef = useRef(null);


  useEffect(() => {
    window.addEventListener("keydown", onControllerDown);
    window.addEventListener("keyup", onControllerUp);
    return () => {
      //cleanup
      window.removeEventListener("keydown", onControllerDown);
      window.removeEventListener("keyup", onControllerUp);
    }
  }, []);



  const onControllerDown = (e) => {
    e.preventDefault()

    // 입력 타입애 따른 조작 방법 선택
    switch (e.type) {

      //컴퓨터, 키보드 조작
      case "keydown":
        setKeyActive(true)

        if (e.key === "w") {
          props.forward()
        } else if (e.key === "s") {
          props.backward()
        } else if (e.key === "a") {
          props.left()
        } else if (e.key === "d") {
          props.right()
        }
        break


      //컴퓨터, 마우스 조작
      case "mousedown":
        if (e.button == 0 && e.target.id == "goFoward") {
          // setForward((prevForward) => prevForward + 1);
          props.forward()
        } else if (e.button == 0 && e.target.id == "goBackward") {
          props.backward()
        } else if (e.button == 0 && e.target.id == "goLeft") {
          props.left()
        } else if (e.button == 0 && e.target.id == "goRight") {
          props.right()
        }
        break;

      //모바일, 터치 조작
      case "touchstart":

        if (e.button == 0 && e.target.id == "goFoward") {
          props.forward()
        } else if (e.button == 0 && e.target.id == "goBackward") {
          props.backward()
        } else if (e.button == 0 && e.target.id == "goLeft") {
          props.left()
        } else if (e.button == 0 && e.target.id == "goRight") {
          props.right()
        }
        break;

      default:
        break
    }

  }

  const onControllerUp = (e) => {

  }

  const handleKeyboardEvent = (e) => {
    e.preventDefault()
    console.log(e.key)
  }


  return (
    <div>
      <ControllerWrapper onKeyPress={handleKeyboardEvent}>
        <div
          id="goFoward"
          className="controlKey goFoward"
          onMouseDown={onControllerDown}
          onMouseUp={onControllerUp}
          onMouseLeave={onControllerUp}
          onTouchStart={onControllerDown}
          onTouchEnd={onControllerUp}
        >
          <p>FORWARD</p>
        </div>
        <div
          id="goBackward"
          className="controlKey goBackward"
          onMouseDown={onControllerDown}
          onMouseUp={onControllerUp}
          onMouseLeave={onControllerUp}
          onTouchStart={onControllerDown}
          onTouchEnd={onControllerUp}
        >
          <p>BACKWARD</p>
        </div>
        <div
          id="goLeft"
          className="controlKey goLeft"
          onMouseDown={onControllerDown}
          onMouseUp={onControllerUp}
          onMouseLeave={onControllerUp}
          onTouchStart={onControllerDown}
          onTouchEnd={onControllerUp}
        >
          <p>LEFT</p>
        </div>
        <div
          id="goRight"
          className="controlKey goRight"
          onMouseDown={onControllerDown}
          onMouseUp={onControllerUp}
          onMouseLeave={onControllerUp}
          onTouchStart={onControllerDown}
          onTouchEnd={onControllerUp}
        >
          <p>RIGHT</p>
        </div>
      </ControllerWrapper>
    </div>
  );
};

export default Controller;
