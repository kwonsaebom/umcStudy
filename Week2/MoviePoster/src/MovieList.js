import React from 'react';

const Moviesist = ({ movies }) => {
  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
            <p>Overview: {movie.overview}</p>
            <p>Vote Average: {movie.vote_average}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
