/**
 * This code renders a loading bar with different colors.
 */
import React from "react";
import '../css/LoadingBar.css';

const LoadingBar = () => {

  return (
    <div className="loading-bar-container">
    <div className="loading-bar">
        <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-secondary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-success" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-danger" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-warning" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-info" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-dark" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
</div>
  );
};

export default LoadingBar;