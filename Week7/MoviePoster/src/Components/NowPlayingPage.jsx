import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import CustomSpinner from "./CustomSpinner";

const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #1e2161;
`;

const MovieItem = styled(Link)`
  position: relative;
  padding: 15px;
  background-color: #50539e;
  overflow: hidden;
  width: 300px;
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  color: white;
`;

const MovieTitle = styled.div`
  margin-top: 20px;
  margin-bottom: 15px;
  flex: 1;
`;

const MovieVote = styled.div`
  margin-top: 23px;
  font-size: 12px;
`;

const Paragraph = styled.p`
  margin-left: 20px;
  margin-right: 20px;
`;

function Movie({ endpoint }) {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  Movie.propTypes = {
    endpoint: PropTypes.string.isRequired,
  };

  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      const apiKey = "a95590c440c1457a4166f509c1ef33c0";
      let apiUrl = `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${apiKey}&page=${currentPage}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
        setTotalPages(data.total_pages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      }
    };

    getMovies();
  }, [endpoint, currentPage]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (currentPage < totalPages) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage, totalPages]);

  return (
    <div>
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <MovieList>
          {movies.map((movie) => (
            <MovieItem key={movie.id} to={`/movie/${movie.id}`}>
              <div className="movie-info-container">
                <MovieImg className="movie-img">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </MovieImg>
                <MovieOverview className="movie-overview">
                  <Paragraph>{movie.original_title}</Paragraph>
                  <Paragraph>{movie.overview}</Paragraph>
                </MovieOverview>
                <MovieInfo className="movie-info">
                  <MovieTitle className="movie-title">
                    {movie.original_title}
                  </MovieTitle>
                  <MovieVote className="movie-vote">
                    ⭐️ {movie.vote_average}
                  </MovieVote>
                </MovieInfo>
              </div>
            </MovieItem>
          ))}
          {currentPage < totalPages && (
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <CustomSpinner />
            </div>
          )}
        </MovieList>
      )}
    </div>
  );
}

export default Movie;
