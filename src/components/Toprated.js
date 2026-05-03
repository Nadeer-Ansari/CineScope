import axios from "axios";
import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import ApiError from "./ApiError";
import { checkAPIAccessibility, getErrorMessage } from "../utils/apiHelper";

export default function Toprated() {
  let [data, setdata] = useState([]);
  let [loading, setLoading] = useState(true);
  let [apiError, setApiError] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY || "d5689bbae1737c3b9062e710a1909402";

  // Check API accessibility on component mount
  useEffect(() => {
    const checkApi = async () => {
      const result = await checkAPIAccessibility();
      if (!result.accessible) {
        const errorMsg = getErrorMessage(result.error);
        setApiError(errorMsg);
        setLoading(false);
      }
    };
    checkApi();
  }, []);

  useEffect(() => {
    if (apiError) return;

    const fetchTopRatedMovies = async () => {
      setLoading(true);
      let apipath = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
      
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);
        
        const response = await axios.get(apipath, {
          signal: controller.signal,
          timeout: 15000
        });
        
        clearTimeout(timeoutId);
        console.log("Top rated movies:", response.data);
        setdata(response.data.results);
        
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
        
        let errorType = "UNKNOWN";
        if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
          errorType = "TIMEOUT";
        } else if (error.message.includes("Network Error")) {
          errorType = "NETWORK";
        }
        
        const errorMsg = getErrorMessage(errorType);
        setApiError(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTopRatedMovies();
  }, [apiError, API_KEY]);

  if (apiError) {
    return (
      <ApiError 
        error={apiError}
        onRetry={() => window.location.reload()}
        onGoHome={() => window.location.href = '/'}
      />
    );
  }

  if (loading) {
    return (
      <div className="container text-center" style={{ padding: "4rem" }}>
        <div className="spinner-border text-danger" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3 className="mt-3">Loading top rated movies...</h3>
      </div>
    );
  }
  
  return (
    <div className="container">
      <div className="section-header">
        <h1>⭐ Top Rated Movies</h1>
      </div>
      {data.length === 0 ? (
        <div className="text-center" style={{ padding: "3rem" }}>
          <p>No top rated movies found. Please try again later.</p>
        </div>
      ) : (
        <div className="row">
          <Movie record={data}></Movie>
        </div>
      )}
    </div>
  );
}
