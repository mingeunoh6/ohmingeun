import styled from "@emotion/styled";

const ScrollArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #333;
  color: #fff;
  padding: 0;
  margin: 0;
  height: 8000px;
  #mousePos {
    position: fixed;
    width: 300px;
    height: 300px;
    color: yellow;
    border: 1px solid yellow;
    padding: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export { ScrollArea };
