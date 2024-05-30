import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MovieDetailPage from "./MovieDetailPage";

const MovieWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const MovieOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(32, 34, 77, 0.8);
  z-index: 1;
`;

const MovieContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 20px;
  box-sizing: border-box;
  z-index: 2;
  position: relative;

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const MovieImg = styled.img`
  width: 40%;
  height: auto;
  padding: 50px 8% 50px 15%;

  @media (max-width: 600px) {
    width: 80%;
    padding: 20px 0;
  }
`;

const MovieTitle = styled.h2`
  color: white;
  font-weight: bold;
  text-align: center;
  margin-top: 0;

  @media (max-width: 600px) {
    margin-top: 20px;
  }
`;

const MovieRate = styled.p`
  color: white;
  font-weight: bold;
  text-align: center;
`;

const MovieDate = styled.p`
  color: white;
  font-weight: bold;
  text-align: center;
`;

const MovieInfo = styled.div`
  color: white;
  padding-right: 10%;

  @media (max-width: 600px) {
    padding-right: 0;
    text-align: center;
  }
`;

const MovieDetailText = styled.p`
  color: white;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 3;
`;

function MovieDetail() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=a95590c440c1457a4166f509c1ef33c0`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setIsLoading(false);
      });
  }, [movieId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  const stars = Array.from({ length: 100 }, (_, index) =>
    index < Math.floor(movie.vote_average) ? "⭐️" : ""
  );

  return (
    <MovieWrapper
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/w500${movie.backdrop_path}")`,
      }}
    >
      <MovieOverlay />
      <MovieContainer>
        <MovieImg
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div>
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieRate>평점 {stars}</MovieRate>
          <MovieDate>개봉일 {movie.release_date}</MovieDate>
          <MovieInfo>
            <b>줄거리</b>
            {movie.overview ? (
              <MovieDetailText>{movie.overview}</MovieDetailText>
            ) : (
              <MovieDetailText>
                TMDB에서 제공하는 API에 상세 줄거리 정보가 없습니다.
              </MovieDetailText>
            )}
          </MovieInfo>
        </div>
      </MovieContainer>
      <ContentWrapper>
        <MovieDetailPage movieId={movieId} />
      </ContentWrapper>
    </MovieWrapper>
  );
}

export default MovieDetail;
