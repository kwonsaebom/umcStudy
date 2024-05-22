import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  .errorMessage {
    margin-top: 10px;
    margin-bottom: 15px;
    color: red;
    font-size: 14px;
    text-align: left;
    width: 400px;
  }

  button {
    width: 400px;
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
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validateId = (value) => {
    if (!value) {
      setIdError("아이디를 입력해 주세요");
    } else {
      setIdError("");
    }
  };

  const validatePassword = (value) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/;

    if (!value) {
      setPasswordError("비밀번호를 입력하세요!");
    } else if (value.length < 4) {
      setPasswordError("최소 4자리 이상 입력해주세요");
    } else if (value.length > 12) {
      setPasswordError("최대 12자리까지 입력 가능합니다");
    } else if (!regex.test(value)) {
      setPasswordError("비밀번호는 영어, 숫자, 특수문자를 포함해주세요");
    } else {
      setPasswordError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateId(id);
    validatePassword(password);

    if (!id || !password) {
      return;
    }

    if (!idError && !passwordError) {
      console.log("로그인 정보:", { id, password });
      navigate("/");
      alert("로그인에 성공하셨습니다!");
    }
  };

  return (
    <Container>
      <InputContainer disabled={!id || !password}>
        <b>로그인 페이지</b>
        <input
          type="text"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            validateId(e.target.value);
          }}
          placeholder="아이디"
        />
        {idError && <p className="errorMessage">{idError}</p>}
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
          placeholder="비밀번호"
        />
        {passwordError && <p className="errorMessage">{passwordError}</p>}
        <button onClick={handleSubmit}>제출하기</button>
      </InputContainer>
    </Container>
  );
};

export default Login;
