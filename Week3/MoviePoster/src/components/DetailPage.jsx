import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetail() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!movieId) {
      return; // movieId가 없으면 fetch 요청을 보내지 않음
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

  return (
    <div>
      <h2>{movie.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Genres: {movie.genres ? movie.genres.map(genre => genre.name).join(', ') : 'N/A'}</p>
      <p>Vote Average: {movie.vote_average}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default MovieDetail;
