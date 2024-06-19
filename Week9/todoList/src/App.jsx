import InputTodo from "./components/InputTodo";
import styled from "styled-components";

function App() {
  return (
    <Background>
      <InputContainer>
        <InputTodo />
      </InputContainer>
    </Background>
  );
}

export default App;

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #e2e2e2;
  height: 100vh;
`;

const InputContainer = styled.div`
  background-color: white;
  width: 60%;
  height: 70%;
  border-radius: 50px;
`;
