import React from "react";
import Image from "./Image";
import { Link } from "react-router-dom";

export default function Movie(props) {
  if (!props.record || props.record.length === 0) {
    return (
      <div className="text-center" style={{ padding: "3rem" }}>
        <p>No movies found</p>
      </div>
    );
  }

  return (
    <>
      {props.record.map((movie) => (
        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={movie.id}>
          <div className="movie-card">
            <Image path={movie.poster_path} />
            <div className="card-body">
              <span className="rating-badge">
                ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </span>
              <h5 className="card-title">{movie.title}</h5>
              <p className="short-text">
                {movie.overview || "No description available."}
              </p>
              <Link to={`/movie/${movie.id}`} className="btn-movie">
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}