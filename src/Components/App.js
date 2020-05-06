import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Home from './Home';
import MovieInfo from './MovieInfo';

const App = () => {
    return (
        <Router>
            <Route exact path = "/" component = {Home} />
            <Route path = {encodeURI("/info/:searchTerm")} component = {MovieInfo} />
        </Router>
    );
}

export default App;
