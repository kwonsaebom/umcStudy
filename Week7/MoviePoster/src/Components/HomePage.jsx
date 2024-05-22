import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(22, 18, 81);
  height: 100vh;
  width: 100%;
`;

const WelcomeScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
  height: 300px;
  width: 100%;
`;

const SearchScreen = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  margin-left: 30px;
`;

const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 60%;
  padding-left: 70px;
  padding-right: 70px;
  background-color: rgb(28, 24, 81);
  overflow-y: auto;
  max-height: 500px;
  margin-top: 20px;
`;

const MainTitle = styled.div`
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

const MovieItem = styled(Link)`
  position: relative;
  padding: 15px;
  background-color: #50539e;
  overflow: hidden;
  width: 220px;
  height: auto;
  margin-bottom: 20px;
  margin-top: 20px;
  color: black;
  text-decoration: none;

  &:hover {
    .movie-overview {
      display: block;
    }
  }
`;

const MovieImg = styled.div`
  img {
    width: 100%;
    height: auto;
  }
`;

const MovieOverview = styled.div`
  display: none;
  position: absolute; /* 부모 요소 내 절대 위치 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(69, 69, 69, 0.8);
  color: white;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const MovieInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MovieTitle = styled.div`
  margin-top: 20px;
  margin-bottom: 15px;
  flex: 1;
  color: white;
`;

const MovieVote = styled.div`
  margin-top: 23px;
  font-size: 12px;
  color: white;
`;

const Paragraph = styled.p`
  margin-left: 20px;
  margin-right: 20px;
`;

const HomePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(0);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    clearTimeout(typingTimeout);

    const timeoutId = setTimeout(() => {
      handleSearch(value);
    }, 1000);

    setTypingTimeout(timeoutId);
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
          vote: movie.vote_average,
          overview: movie.overview,
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
      <MainTitle>
        <h2>📽 Find your movies !</h2>
      </MainTitle>
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
          <MovieItem key={movie.id} to={`/movie/${movie.id}`}>
            <MovieImg className="movie-img">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                alt={movie.title}
              />
            </MovieImg>
            <MovieOverview className="movie-overview">
              <Paragraph>{movie.title}</Paragraph>
              <Paragraph>{movie.overview}</Paragraph>
            </MovieOverview>
            <MovieInfo className="movie-info">
              <MovieTitle className="movie-title">{movie.title}</MovieTitle>
              <MovieVote className="movie-vote">⭐️ {movie.vote}</MovieVote>
            </MovieInfo>
          </MovieItem>
        ))}
      </MovieList>
    </HomeContainer>
  );
};

export default HomePage;
