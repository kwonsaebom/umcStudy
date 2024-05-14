import styled from "styled-components";

const Container = styled.div`
  background-color: #1e2161;
  height: 100vh;
  display: flex;
  justify-content: center;
  color: white;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  b {
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 20px;
  }

  input {
    width: 400px;
    padding: 12px;
    margin-bottom: 10px;
    border: none;
    border-radius: 20px;

    &:focus {
      outline: none;
    }
  }

  button {
    width: 430px;
    padding: 12px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: ${(props) => (props.disabled ? "#ccc" : "white")};
    color: black;
    font-size: 15px;
    border: none;
    border-radius: 20px;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${(props) => (props.disabled ? "#ccc" : "#f8e53e")};
    }
  }
`;

const Login = () => {
  return (
    <>
      <Container>
        <InputContainer>
          <b>로그인 페이지</b>
          <input type="text" placeholder="아이디" />
          <input type="text" placeholder="비밀번호" />
          <button>제출하기</button>
        </InputContainer>
      </Container>
    </>
  );
};

export default Login;
