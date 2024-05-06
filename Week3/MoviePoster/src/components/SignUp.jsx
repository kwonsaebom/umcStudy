import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate를 import합니다.
import styled from 'styled-components';

const Container = styled.div`
    background-color: #1e2161;
    height: 100vh;
    display: flex;
    justify-content: center;
`;

const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;

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
        width: 430px;
        padding: 12px;
        margin-top: 20px;
        margin-bottom: 20px;
        background-color: ${props => props.disabled ? '#ccc' : 'white'};
        color: black;
        font-size: 15px;
        border: none;
        border-radius: 20px;
        cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
        transition: background-color 0.3s ease;

        &:hover {
            background-color: ${props => props.disabled ? '#ccc' : '#f8e53e'};
        }
    }
`;

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [ageError, setAgeError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

    const validateName = (value) => {
        if (!value) {
            setNameError('이름을 입력하세요!');
        } else {
            setNameError(false);
        }
    };

    const validateEmail = (value) => {
        if (!value || value.indexOf('@') === -1) {
            setEmailError('올바른 이메일 형식이 아닙니다!');
        } else {
            setEmailError(false);
        }
    };

    const validateAge = (value) => {
        if (!value) {
            setAgeError('나이를 입력하세요!');
        } else if (isNaN(Number(value))) {
            setAgeError('나이는 숫자로 입력해주세요!');
        } else if (Number(value) < 0) {
            setAgeError('나이는 양수여야 합니다.');
        } else if (Number.isInteger(Number(value)) === false) {
            setAgeError('나이는 실수로 입력할 수 없습니다.');
        } else if (Number(value) < 19) {
            setAgeError('19세 이상만 사용 가능합니다!');
        } else {
            setAgeError(false);
        }
    };

    const validatePassword = (value) => {

        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/; // 정규 표현식 수정: +를 추가하여 최소 한 글자 이상의 문자열을 요구함

        if (!value) {
            setPasswordError('비밀번호를 입력하세요!');
        } else if (value.length < 4) {
            setPasswordError('최소 4자리 이상 입력해주세요');
        } else if (value.length > 12) {
            setPasswordError('최대 12자리까지 입력 가능합니다');  
        } else if (!regex.test(value)) {
            setPasswordError('비밀번호는 영어, 숫자, 특수문자를 포함해주세요')
        } else {
            setPasswordError(false);
        }
    };

    const validateConfirmPassword = (value) => {
    
        if (!value) {
            setConfirmPasswordError('비밀번호를 다시 입력해주세요!');
        } else if (value !== password) {
            setConfirmPasswordError('비밀번호가 일치하지 않습니다!');
        } else {
            setConfirmPasswordError(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 필드 유효성 검사
        validateName(name);
        validateEmail(email);
        validateAge(age);
        validatePassword(password);
        validateConfirmPassword(confirmPassword);

        // 유효성 검사를 통과하면 제출 처리
        if (!nameError && !emailError && !ageError && !passwordError && !confirmPasswordError) {
            console.log('회원가입 정보:', { name, email, age, password });
            // 모든 조건이 만족하면 홈페이지로 이동합니다.
            navigate('./HomePage');
        }
    };

    return (
        <Container>
            <SignUpContainer disabled={!name || !email || !age || !password || !confirmPassword}>
                <b>회원가입 페이지</b>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        validateName(e.target.value);
                    }}
                    placeholder="이름을 입력해주세요"
                />
                {nameError && <p className="errorMessage">{nameError}</p>}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        validateEmail(e.target.value);
                    }}
                    placeholder="이메일을 입력해주세요"
                />
                {emailError && <p className="errorMessage">{emailError}</p>}
                <input
                    type="text"
                    value={age}
                    onChange={(e) => {
                        setAge(e.target.value);
                        validateAge(e.target.value);
                    }}
                    placeholder="나이를 입력해주세요"
                />
                {ageError && <p className="errorMessage">{ageError}</p>}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        validatePassword(e.target.value);
                    }}
                    placeholder="비밀번호를 입력해주세요"
                />
                {passwordError && <p className="errorMessage">{passwordError}</p>}
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        validateConfirmPassword(e.target.value);
                    }}
                    placeholder="비밀번호 확인"
                />
                {confirmPasswordError && <p className="errorMessage">{confirmPasswordError}</p>}
                <button onClick={handleSubmit}>제출하기</button>
            </SignUpContainer>
        </Container>
    );
};

export default SignUp;
