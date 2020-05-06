import React from 'react';

import './App.css';
import Header from './Header';
import Movie from './Movie';
import Search from './Search';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { movies : [], errorMessage : null, loading: false}
    }

    search = (searchTerm) => {
        this.setState({ loading: true, errorMessage: null });
        fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=522dd122`)
        .then(response => response.json())
        .then(jsonResponse => {
            if (jsonResponse.Response === "True") {
                this.setState({movies: jsonResponse.Search, loading: false });
            } 
            else {
                this.setState({errorMessage: jsonResponse.Error, loading: false });
            }
        });
    }

    render() {
        return (
            <div className="app">
                <Header title = "Movie Library" />
                <Search search = {this.search} />
                <div style = {{backgroundColor: "red", marginTop:"30px", height:"1px"}}></div>
                <div className = "movies">
                    {
                        this.state.loading && !this.state.errorMessage ? (
                        <span>loading...</span>
                        ) : this.state.errorMessage ? (
                        <div className="errorMessage">{this.state.errorMessage}</div>
                        ) : this.state.movies === undefined ? ( 
                        <div></div> 
                        ) : (
                        this.state.movies.map((movie, index) => (
                            <Movie key={`${index}-${movie.Title}`} movie={movie} />
                        ))
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Home;