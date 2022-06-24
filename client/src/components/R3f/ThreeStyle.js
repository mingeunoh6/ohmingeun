/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";


const dynamicStyle = props =>
  css`
    position: ${props.position};
    color: ${props.color};
    width: ${props.width};
    height: ${props.height};
  `


const Wrapper = styled.div`
  ${dynamicStyle};
`

const CanvasWrapper = styled.div`
${dynamicStyle};
  border: 1px solid blue;
 
`;

const Inspector = styled.div`
position: absolute;
top: 0;
right: 0;
color: white;
z-index: 9999999;
&> ul{
  border: 1px solid red;
}

`



export {
  CanvasWrapper,
  Inspector
};
