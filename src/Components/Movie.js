import React from 'react';
import { Link } from 'react-router-dom';

const DEFAULT_POSTER =
    "https://placehold.it/198x264&text=Image+Not+Found";

const Movie = (props) => {
    const poster = props.movie.Poster === "N/A" ? DEFAULT_POSTER: props.movie.Poster;
    return (
        <div className = "movie">
            <Link to = {`/info/${encodeURIComponent(props.movie.Title)}`} className = "link">
                <h2>{props.movie.Title}</h2>
            </Link>
            <div>
                <Link to = {`/info/${encodeURIComponent(props.movie.Title)}`} className = "link">
                    <img src = {poster} width = "200" alt = {poster} />
                </Link>
            </div>
            <p>({props.movie.Year})</p>
        </div>
    );
};

export default Movie;