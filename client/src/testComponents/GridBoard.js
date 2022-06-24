import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  createRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrnetGrid, emptyCurrnetGrid } from "../reducer/testerSlice";
import styled from "@emotion/styled";
import CssBoardGridCell from "./GridItems/CssBoardGridCell";
import PropTypes from "prop-types";

const GridBoard = ({ column, row, columnGap, rowGap }) => {
  const activeCell = useSelector((state) => state.test);
  const cssGridLayoutWrapper = useRef(null);
  const [columnGrid, setColumGrid] = useState([]);
  const [currentCell, setCurrentCell] = useState({});
  const [gridCellList, setGridCellList] = useState([]);

  const refs = useRef([]);
  refs.current = [];
  const addToRefs = (el) => {
    refs.current.push(el);
  };

  useEffect(() => {
    console.log("컴포넌트가 화면에 나타남");

    return () => {
      console.log("컴포넌트가 화면에서 사라짐");
    };
  }, [column, row, columnGap, rowGap]);

  //Create Grid Cell
  const createCell = useCallback(() => {
    console.log("셀만들기시작");

    let newCells = [];
    let cell;
    for (let i = 1; i < parseInt(column) + 1; i++) {
      for (let j = 1; j < parseInt(row) + 1; j++) {
        cell = <CssBoardGridCell row={j} col={i} ref={addToRefs()} />;

        newCells.push(cell);
      }
    }
    console.log(newCells);
    return newCells.map((cell) => cell);
  }, [column, row, columnGap, rowGap]);

  //grid-area: grid-row-start , grid-column-start,grid-row-end , grid-column-end
  //if row==3 => grid-row => 1,2,3
  //each-cell -> grid area => row i, column j, auto, auto

  const CssBoardGrid = styled.div`
    display: grid;
    border: 1px solid red;
    height: 100%;
    width: 100%;
    grid-template-columns: ${(props) => `repeat(${props.columns}, 1fr)`};
    grid-template-rows: ${(props) => `repeat(${props.rows}, 1fr)`};
    column-gap: ${(props) => ` ${props.columnGap}px`};
    row-gap: ${(props) => `${props.rowGap}px`};
  `;

  return (
    <>
      <CssBoardGrid
        columns={column}
        rows={row}
        columnGap={columnGap}
        rowGap={rowGap}
        ref={cssGridLayoutWrapper}
      >
        {column && row && columnGap && rowGap ? createCell() : null}
      </CssBoardGrid>
    </>
  );
};

export default GridBoard;
