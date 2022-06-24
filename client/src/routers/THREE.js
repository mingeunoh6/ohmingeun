import React, { useRef, useState, useEffect, useCallback } from "react";
import Controller from "../components/R3f/Controller";
import {
  AnimationClip,
  BooleanKeyframeTrack,
  ColorKeyframeTrack,
  NumberKeyframeTrack,
  Vector3,
  VectorKeyframeTrack,
} from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { AmbientLight } from "three";
import useInput from "../hooks/useInput";

const ThreeEditFrame = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
`;
const ThreeScreen = styled.div`
  position: relative;
  flex: none;
  max-width: 80%;
  min-width: 20%;
  height: 100%;

  flex-grow: 0;
  align-self: stretch;
  background-color: black;
  & canvas {
    height: 100%;
    width: 100%;
  }
`;

const ThreeAnimator = styled.div`
  position: relative;
  flex: none;
  flex-grow: 2;
  min-width: 30%;
  max-width: 40%;
  align-self: stretch;
  background-color: ivory;
`;

const ThreeStarter = () => {
  const [currentObject, setCurrentObject] = useState({});
  const [rotateX, setRotateX] = useState(1);
  const [rotateY, setRotateY] = useState(1);
  const [rotateZ, setRotateZ] = useState(1);

  const onChangeRotateX = useCallback(
    (e) => {
      setRotateX(e.target.value);
    },
    [rotateX]
  );
  const onChangeRotateY = useCallback(
    (e) => {
      setRotateY(e.target.value);
    },
    [rotateY]
  );
  const onChangeRotateZ = useCallback(
    (e) => {
      setRotateZ(e.target.value);
    },
    [rotateZ]
  );

  const getTargetMesh = (e) => {
    console.log(e.object);
    e.stopPropagation();
    setCurrentObject(e.object);
  };

  return (
    <>
      <ThreeEditFrame>
        <ThreeScreen>
          <Controller />
          <Canvas camera={{ position: [0, 1, -10] }}>
            <OrbitControls />
            <ambientLight intensity={1} />
            <spotLight position={[10, 15, 10]} angle={0.3} />
            <Mesh
              getTargetMesh={getTargetMesh}
              rotationX={rotateX}
              rotationY={rotateY}
              rotationZ={rotateZ}
            />
          </Canvas>
        </ThreeScreen>
        <ThreeAnimator>
          {Object.keys(currentObject).length === 0 ? (
            <h1>No target</h1>
          ) : (
            <>
              <h1>{currentObject.uuid}</h1>
              <div>
                <fieldset>
                  <legend>Rotate:</legend>
                  <label htmlFor="rotateX">rotateX</label>

                  <input
                    id="rotateX"
                    value={rotateX}
                    onChange={onChangeRotateX}
                    type="number"
                  />
                  <br />
                  <label htmlFor="rotateY">rotateY</label>

                  <input
                    id="rotateY"
                    value={rotateY}
                    onChange={onChangeRotateY}
                    type="number"
                  />
                  <br />
                  <label htmlFor="rotateZ">rotateZ</label>

                  <input
                    id="rotateZ"
                    value={rotateZ}
                    onChange={onChangeRotateZ}
                    type="number"
                  />
                  <br />
                </fieldset>
              </div>
            </>
          )}
        </ThreeAnimator>
      </ThreeEditFrame>
    </>
  );
};

const Mesh = React.memo(
  ({ getTargetMesh, rotationX, rotationY, rotationZ }) => {
    const myMesh = React.useRef();

    return (
      <>
        <mesh
          visible
          userData={{ hello: "world" }}
          position={[0, 0, 0]}
          rotation={[
            Math.PI / rotationX,
            Math.PI / rotationY,
            Math.PI / rotationZ,
          ]}
          onClick={getTargetMesh}
          ref={myMesh}
          scale={[1, 1, 1]}
        >
          <boxGeometry args={[1, 0.1, 1]} />
          <meshStandardMaterial color="blue" transparent />
        </mesh>
      </>
    );
  }
);

export default ThreeStarter;
