import { useState } from "react";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 100%;
`;

const SearchScreen = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  margin-left: 30px;
`;

const Paragraph = styled.div`
  color: white;
  margin-top: 30px;
  text-align: center;
`;

const Input = styled.input`
  padding: 10px;
  border: solid 2px black;
  border-radius: 20px;
  width: 400px;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  background-color: #f8e53e;
  color: black;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-left: 10px;
  margin-top: 5px;
`;

const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 60%;
  padding-left: 70px;
  padding-right: 70px;
  background-color: rgb(28, 24, 81);
  overflow-y: auto;
  max-height: 300px;
  margin-top: 20px;
`;

const MovieItem = styled.div`
  background-color: #34336b;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  color: white;

  width: 20%;
`;

const MovieImg = styled.div`
  img {
    width: 100%;
    border-radius: 5px;
  }
`;

const MovieInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 12px;
`;

const Title = styled.div``;

const Vote = styled.div`
  color: white;
`;

const HomePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    // 타자를 칠 때마다 검색 실행
    handleSearch(value);
  };

  const handleSearch = (query) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=a95590c440c1457a4166f509c1ef33c0&query=${query}`
    )
      .then((response) => response.json())
      .then((data) => {
        const movies = data.results.map((movie) => ({
          id: movie.id,
          posterPath: movie.poster_path,
          title: movie.original_title,
          vote: movie.vote_average, // 수정: vote_average -> vote
        }));
        setSearchResult(movies);
      })
      .catch((error) => console.error("API 호출 중 오류 발생:", error));
  };

  return (
    <HomeContainer>
      <WelcomeScreen>
        <h1>환영합니다</h1>
      </WelcomeScreen>
      <Paragraph>
        <h1>📽 Find your movies !</h1>
      </Paragraph>
      <SearchScreen>
        <Input type="text" value={searchValue} onChange={handleInputChange} />
        <Button
          onClick={() => handleSearch(searchValue)}
          disabled={!searchValue}
        >
          🔍
        </Button>
      </SearchScreen>
      <MovieList>
        {searchResult.map((movie) => (
          <MovieItem key={movie.id}>
            <MovieImg>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                alt={movie.title}
              />
            </MovieImg>
            <MovieInfo>
              <Title>{movie.title}</Title>
              <Vote>⭐️ {movie.vote}</Vote>
            </MovieInfo>
          </MovieItem>
        ))}
      </MovieList>
    </HomeContainer>
  );
};

export default HomePage;
