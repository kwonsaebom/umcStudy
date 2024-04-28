import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(22, 18, 81);
  height: 100vh;
`;

const WelcomeScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
  padding: 20px;
  height: 200px;
`;

const SearchScreen = styled.div`
  margin-top: 10px; 
  display: flex;
  justify-content: center;
  margin-left: 30px;
`;

const Paragraph = styled.div`
  color:white;
  margin-top: 30px;
  text-align:center;
`;

const Input = styled.input`
  padding: 10px;
  border: solid 2px black;
  border-radius: 20px;
  width: 400px;
`;

const Button = styled.button`
  background-color: yellow;
  color: black;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-left: 10px;
  margin-top: 5px;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <WelcomeScreen>
        <h1>환영합니다</h1>
      </WelcomeScreen>
      <Paragraph><h1>📽 Find your movies !</h1></Paragraph>
      <SearchScreen>
        <Input type="text" />
        <Button>🔍</Button>
      </SearchScreen>
    </HomeContainer>
  );
};

export default HomePage;
