import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

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

function StyledMovie({ isLoading, movies }) {
  return (
    <div>
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <div>
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
        </div>
      )}
    </div>
  );
}

StyledMovie.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  movies: PropTypes.array.isRequired,
};

export default StyledMovie;
