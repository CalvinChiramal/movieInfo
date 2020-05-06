import React from 'react';

import './App.css';

class MovieInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { movieDetail: {}, loading: true, errorMessage: null, ratings: [] };
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(decodeURIComponent(params.searchTerm));
        this.setState({ loading: true, errorMessage: null });
        fetch(`https://www.omdbapi.com/?t=${decodeURIComponent(params.searchTerm)}&apikey=522dd122&plot=full`)
        .then(response => response.json())
        .then(jsonResponse => {
            if (jsonResponse.Response === "True") {
                console.log(jsonResponse);
                this.setState({ movieDetail:jsonResponse, ratings:jsonResponse.Ratings, loading: false });
            } 
            else {
                this.setState({ errorMessage:jsonResponse.Error, loading: false })
            }
        });
    }

    render() {
        const DEFAULT_POSTER = "https://placehold.it/198x264&text=Image+Not+Found";
        const poster = this.state.movieDetail.Poster === "N/A" ? DEFAULT_POSTER : this.state.movieDetail.Poster;
        const rates = ["/imdb.png", "/rotten.png", "/meta.png"];
        //eslint-disable-next-line
        this.state.ratings.map((rating,index) => {
            rating.Img = rates[index];
        });

        return (
            this.state.loading && !this.state.errorMessage ? (
            <div className = "loading">
                Loading...
            </div>
            ) : this.state.errorMessage ? (
            <div className = "nomovie">{this.state.errorMessage}</div>
            ) : this.state.movieDetail === undefined ? (
                <div></div>
            ) : (
                <div className = "info">
                    {window.innerWidth<651 ? (
                        <div className = "titcont">
                            <span className = "title">
                                {this.state.movieDetail.Title}<br/>
                            </span>
                            <span className = "year">
                                ({this.state.movieDetail.Year})
                            </span>
                        </div> ) : (<div></div>)
                    }
                    <div className = "poster">
                        <img className = "image" src = {poster} alt = {poster} />
                        <div className = "ratings">
                            {window.innerWidth>=652 ? (
                                <div className = "titcont2">
                                    <span className = "title">
                                        {this.state.movieDetail.Title}<br/>
                                    </span>
                                    <span className = "year">
                                        ({this.state.movieDetail.Year})
                                    </span>
                                </div> ) : (<div></div>)
                            }
                            <div className="rating">
                            { this.state.ratings.map((rating) =>(
                                <div> <img src={rating.Img} width="25" alt={rating.Img} /> : {rating.Value}</div>
                            ))
                            }
                            </div> 
                        </div>
                    </div>
                    <div className = "plot">
                        <div>
                            <h2>Synopsis:<br/></h2>
                            {this.state.movieDetail.Plot}
                        </div>
                    </div>
                </div>
            )
        );
    }
}

export default MovieInfo;