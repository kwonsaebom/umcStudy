import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const MovieItem = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url('https://image.tmdb.org/t/p/w500${props => props.posterPath}');
  background-size: cover;
  background-position: center;

  overflow: hidden;
`
const MovieOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(32, 34, 77, 0.8);
`

const MovieContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const MovieImg = styled.img`
  position: relative;
  justify-content: center;
  width: 25%; 
  height: auto;
  padding-left: 15%;
  padding-right: 8%;
`;

const MovieTitle = styled.h2`
  position: relative;
  color: white;
  font-weight: bold;
`;

const MovieRate = styled.p`
  position: relative;
  color: white;
  font-weight: bold;
`;

const MovieDate = styled.p`
  position: relative;
  color: white;
  font-weight: bold;
`;

const MovieInfo = styled.div`
  position: relative;
  color: white;
  padding-right:10%;
`;

const MovieDetailText = styled.p`
  position: relative;
  color: white;
`;

function MovieDetail() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=a95590c440c1457a4166f509c1ef33c0`)
      .then(response => response.json())
      .then(data => {
        setMovie(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching movie details:', error);
        setIsLoading(false);
      });
  }, [movieId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  const stars = Array.from({ length: 100 }, (_, index) => index < Math.floor(movie.vote_average) ? '⭐️' : '');
  
  return (
    <MovieItem posterPath={movie.poster_path}>
      <MovieOverlay />
      <MovieContainer>
          <MovieImg src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div>
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieRate>평점 {stars}</MovieRate>
          <MovieDate>개봉일 {movie.release_date}</MovieDate>
          <MovieInfo>
            <b>줄거리</b>
            {movie.overview ? (
              <MovieDetailText>{movie.overview}</MovieDetailText>
            ) : (
              <MovieDetailText>TMDB에서 제공하는 API에 상세 줄거리 정보가 없습니다.</MovieDetailText>
            )}
          </MovieInfo>
        </div>
      </MovieContainer>
    </MovieItem>
  );
}


export default MovieDetail;
