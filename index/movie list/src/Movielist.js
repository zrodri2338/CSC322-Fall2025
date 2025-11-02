import React from 'react';

function MovieList() {
  const movies = [
    { title: "Inception", year: 2010 },
    { title: "The Matrix", year: 1999 },
    { title: "Interstellar", year: 2014 },
    { title: "The Dark Knight", year: 2008 },
  ];

  return (
    <ul>
      {movies.map((movie, index) => (
        <li key={index}>{movie.title} ({movie.year})</li>
      ))}
    </ul>
  );
}

export default MovieList;
