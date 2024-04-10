import PropTypes from 'prop-types';

const MovieList = ({ movies }) => {
    return (
      <div>
      <div className="movie-list-container"> {/* 이 부분에 클래스를 추가 */}
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <div className="movie-info-container">
                <div className="movie-img">
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                  <div className="movie-overview">
                    <p>{movie.original_title}</p>
                    <p>{movie.overview}</p>
                    </div>
                </div>
                <div className="movie-info">
                  <div className="movie-title">
                    <h4>{movie.original_title}</h4>
                  </div>
                  <div className="movie-vote">
                    {movie.vote_average}  
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    );
  };
  
  // MovieList 컴포넌트에 전달되는 props의 유효성을 검사합니다.
  MovieList.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired // movies는 객체로 이루어진 배열이어야 합니다.
  };

  export default MovieList;