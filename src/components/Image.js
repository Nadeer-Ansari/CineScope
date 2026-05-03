import React from "react";

export default function Image(props) {
  if (!props.path) {
    return (
      <div className="image-container">
        <div style={{ 
          width: "200px", 
          height: "300px", 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "14px"
        }}>
          No Image
        </div>
      </div>
    );
  }
  
  return (
    <div className="image-container">
      <img
        className={`movie-poster ${props.className || ""}`}
        src={"https://image.tmdb.org/t/p/w500" + props.path}
        alt="Movie Poster"
      />
    </div>
  );
}