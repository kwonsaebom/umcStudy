import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ErrorPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(29, 24, 100);
  height: 100vh;
`;

const Title = styled.h1`
  color: white;
  font-size: 3rem;
`;

const Message = styled.p`
  color: white;
  font-size: 1.5rem;
`;

const NotFound = styled.i`
  color: white;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #4CAF50;
  color: white;
  font-size: 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 2rem;

  &:hover {
    background-color: #45a049;
  }
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoToMain = () => {
    navigate('/');
  };

  return (
    <ErrorPage>
        <Title>
            Oops!
        </Title>
        <Message>
            ☠️ 예상치 못한 에러가 발생했습니다 ☠️
        </Message>
        <NotFound>
            Not Found
        </NotFound>
        <Button onClick={handleGoToMain}>
            Go to Main 🚀
        </Button>
    </ErrorPage>
  );
};

export default NotFoundPage;
