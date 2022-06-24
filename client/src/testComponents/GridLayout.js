/** @jsxImportSource @emotion/react */
import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import { css, cx, jsx, ClassName } from "@emotion/react";

import {
  Wrapper,
  LeftPanel,
  RightPanel,
  CenterArea,
  PanelItem,
  InputArea,
  Layout,
} from "./GridLayoutStyle";

import GridBoard from "./GridBoard";
import CellEditor from "./Components/CellEditor";

const GridLayout = () => {
  const currentGridCell = useSelector((state) => state.test);

  console.log("reducer", currentGridCell.cellId);

  const [columnInput, setColumnInput] = useState("2");
  const [rowInput, setRowInput] = useState("2");
  const [columnGap, setColumnGap] = useState("5");
  const [rowGap, setRowGap] = useState("5");

  const onChangeColumnInput = useCallback(
    (e) => {
      console.log("newColumn");
      setColumnInput(e.target.value);
    },
    [columnInput]
  );

  const onChangeRowInput = useCallback(
    (e) => {
      console.log("newRow");
      setRowInput(e.target.value);
    },
    [rowInput]
  );

  const onChangeColumnGap = useCallback(
    (e) => {
      console.log("newColumn Gap");
      setColumnGap(e.target.value);
    },
    [columnGap]
  );

  const onChangeRowGap = useCallback(
    (e) => {
      console.log("newRow Gap");
      setRowGap(e.target.value);
    },
    [rowGap]
  );

  return (
    <>
      <Wrapper>
        <LeftPanel>
          <div className="Lp-Wrapper" id="Lp-panel1">
            <div className="Lp-section">
              <div className="title">
                <h1>BoardList</h1>
              </div>

              <div className="Sub-title">
                <h2>
                  Board List<span>(num)</span>
                </h2>
              </div>
              <div className="Lp-ItemBox">
                <ul className="Item-List">
                  <li>
                    <div className="List-Itme">
                      <h3>board001</h3>
                      <div className="List-Item-icon-group">
                        <div>edit</div>
                        <div>delete</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="Lp-Wrapper" id="Lp-panel2">
            <div className="Lp-section">
              <div className="title">
                <h1>EditMode</h1>
              </div>

              <div className="Sub-title">
                <h2>
                  Board List<span>(num)</span>
                </h2>
              </div>
              <div className="Lp-ItemBox">
                <ul className="Item-List">
                  <li>
                    <div className="List-Itme">
                      <h3>board001</h3>
                      <div className="List-Item-icon-group">
                        <div>edit</div>
                        <div>delete</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="Lp-Wrapper" id="Lp-panel3">
            <div className="Lp-section">
              <div className="title">
                <h1>Marker</h1>
              </div>

              <div className="Sub-title">
                <h2>
                  Board List<span>(num)</span>
                </h2>
              </div>
              <div className="Lp-ItemBox">
                <ul className="Item-List">
                  <li>
                    <div className="List-Itme">
                      <h3>board001</h3>
                      <div className="List-Item-icon-group">
                        <div>edit</div>
                        <div>delete</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </LeftPanel>
        <CenterArea>
          <Layout>
            <GridBoard
              column={columnInput}
              row={rowInput}
              columnGap={columnGap}
              rowGap={rowGap}
            />
          </Layout>
        </CenterArea>

        <RightPanel>
          <h2>Board001</h2>
          <hr />
          <PanelItem>
            <h3>Grid setting</h3>
            <hr />
            <div className="item-1">
              <InputArea
                title="가로단"
                id="columnInput"
                type="number"
                value={columnInput}
                onChange={onChangeColumnInput}
              />
              <InputArea
                title="세로단"
                id="rowInput"
                type="number"
                value={rowInput}
                onChange={onChangeRowInput}
              />

              <InputArea
                title="가로간격"
                id="ColumnGap"
                type="number"
                value={columnGap}
                onChange={onChangeColumnGap}
              />
              <InputArea
                title="세로간격"
                id="RowGap"
                type="number"
                value={rowGap}
                onChange={onChangeRowGap}
              />
            </div>
          </PanelItem>
          <hr />
          <CellEditor cell={currentGridCell} />
        </RightPanel>
      </Wrapper>
    </>
  );
};

export default GridLayout;
