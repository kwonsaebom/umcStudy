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
    if (!value) {
      setPasswordError("비밀번호를 입력하세요!");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    validateId(id);
    validatePassword(password);

    if (!id || !password) {
      return;
    }

    if (!idError && !passwordError) {
      console.log("로그인 정보:", { id, password });
      try {
        const response = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: id, password }),
        });

        if (!response.ok) {
          if (response.status === 401) {
            alert("아이디 또는 비밀번호가 잘못되었습니다.");
          } else {
            alert("로그인 중 오류가 발생했습니다.");
          }
          return;
        }

        const data = await response.json();
        alert(`${data.username}님, 환영합니다!`);
        localStorage.setItem("token", data.token);
        navigate("/");
        navigate(0);
      } catch (error) {
        console.error("로그인 중 오류 발생:", error);
        alert("로그인 중 오류가 발생했습니다.");
      }
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
        <button onClick={handleSubmit} disabled={!id || !password}>
          제출하기
        </button>
      </InputContainer>
    </Container>
  );
};

export default Login;
