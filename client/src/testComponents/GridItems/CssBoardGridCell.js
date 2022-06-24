import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  createRef,
} from "react";
import { setCurrnetGrid, emptyCurrnetGrid } from "../../reducer/testerSlice";

import { useSelector, useDispatch } from "react-redux";

import styled from "@emotion/styled";

const CssBoardGridCell = ({ row, col, key }) => {
  const dispatch = useDispatch();
  const onPointCellCheck = (e) => {
    dispatch(setCurrnetGrid(e.target.id));
  };

  const GridCell = styled.div`
    grid-area: ${(props) => `${props.rowNumb}/${props.colNumb}/auto/auto`};
    height: 100%;
    width: 100%;
    border: 1px solid white;
  `;

  return (
    <GridCell
      rowNumb={row}
      colNumb={col}
      key={key}
      id={`cell-${row}${col}`}
      onClick={onPointCellCheck}
    ></GridCell>
  );
};

export default CssBoardGridCell;
