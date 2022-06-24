import styled from "@emotion/styled";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 50px;
  background: #333;
  color: #fff;
  input {
    height: 30px;
    padding: 15px;
    border-radius: 10px;
  }
  textarea {
    border-radius: 10px;
    padding: 15px;
    min-height: 350px;
    resize: none;
  }
  button {
    margin: 20px auto;
    width: 200px;
    height: 64px;
  }
`;

export { Form };
