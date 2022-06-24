/** @jsxImportSource @emotion/react */

import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { css, jsx, ClassName } from "@emotion/react";

import PropTypes from "prop-types";
import { Children } from "react";

const Wrapper = styled.div`
  font-size: 15px;

  height: 100%;

  display: flex;
  flex-direction: row;

  justify-content: space-between;
  & > h1 {
    font-size: 2.3rem;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.2rem;
  }
  p {
    font-size: 1rem;
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 400px;

  border: 1px solid red;

  & .Lp-Wrapper {
    max-width: 400px;
    background-color: white;
    align-self: stretch;
  }
  & #Lp-panel1 {
    min-height: 250px;
    max-height: 300px;
    order: 1;
    flex-grow: 1;
  }
  & #Lp-panel2 {
    order: 2;
    min-height: 300px;

    flex-grow: 2;
    flex-shrink: 1;
  }
  & #Lp-panel3 {
    min-height: 284px;
    order: 3;

    flex-shrink: 1;
    border-bottom: 1px solid green;
  }
  & .Lp-section {
    padding: 10px;
    width: 100%;
    height: 100%;
    border: 1px solid black;
    background-color: white;
    box-sizing: border-box;
    & .title {
      font-size: 2.2rem;
    }
  }
  & .Lp-ItemBox {
    padding: 5px;
    border: 1px solid black;
    & .List-Itme {
      display: flex;
      justify-content: space-between;
      border: 1px solid black;
    }
    & .List-Item-icon-group {
      display: flex;
      border: 1px solid black;
      justify-content: flex-end;
      & > div {
        margin-left: 5px;
      }
    }
  }
`;

const RightPanel = styled.div`
  border: 1px solid black;
  width: 300px;
  padding: 5px;
`;

const CenterArea = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100%;
  text-align: center;
`;

const PanelItem = styled.div`
  padding: 10px;

  & h2 {
    margin-bottom: 10px;
  }
`;

const Input = styled.div`
  border: 1px solid black;
  padding: 2px;
  display: flex;
  justify-content: space-between;
  & {
    input,
    label {
      width: 50%;
      margin: 4px;
    }
  }
`;
const Layout = styled.div`
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  left: 50%;
  top: 50%;
  width: 50%;
  height: 80%;
  background-color: blue;
`;

const InputArea = ({ title, id, type, value, onChange }) => {
  return (
    <>
      <Input>
        <label htmlFor={id}>{title}</label>
        <input id={id} type={type} value={value} onChange={onChange}></input>
      </Input>
    </>
  );
};

InputArea.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export {
  Wrapper,
  LeftPanel,
  RightPanel,
  CenterArea,
  PanelItem,
  Input,
  InputArea,
  Layout,
};
