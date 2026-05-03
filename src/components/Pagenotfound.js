import React from "react";
import { Link } from "react-router";

export default function Pagenotfound() {
  return (
    <div className="container text-center" style={{ padding: "4rem" }}>
      <h1 style={{ fontSize: "4rem", color: "#e50914" }}>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn-movie" style={{ display: "inline-block", width: "auto", padding: "0.75rem 2rem" }}>
        Go Back Home
      </Link>
    </div>
  );
}