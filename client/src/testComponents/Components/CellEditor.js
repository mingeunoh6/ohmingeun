import React, { useCallback, useState } from "react";
import { css, cx, jsx, ClassName } from "@emotion/react";
import { useSelector } from "react-redux";
import { PanelItem } from "../GridLayoutStyle";
import GridItem from "../GridItems/GridItem";

const CellEditor = ({ cell }) => {
  const addImage = () => {
    console.log(cell.cellId, "에 image 추가");
    let targetCell = document.querySelector(`#${cell.cellId}`);

    let imgElement = document.createElement("div");
    imgElement.textContent = "image";
    targetCell.append(imgElement);
  };

  const CellitemSetting = () => {
    return (
      <>
        <p>{cell.cellId}</p>
        <hr />
        <div>
          <div
            css={css`
              margin: 10px;
              padding: 10px;
              background-color: #eee;
              cursor: pointer;
              &:hover {
                color: red;
              }
            `}
            onClick={addImage}
          >
            Image
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <PanelItem>
        <h3>Cell Selection</h3>
        <hr />
        {cell.cellId ? <CellitemSetting /> : <p>none</p>}
        <hr />
      </PanelItem>
    </div>
  );
};

export default CellEditor;
