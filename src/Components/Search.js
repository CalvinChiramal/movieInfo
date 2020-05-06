import React, { useState } from 'react';

const Search = (props) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const searchFunction = (e) => {
        e.preventDefault();
        props.search(searchTerm);
        setSearchTerm("");
    }

    return (
        <form className = "search">
            <input type = "text" onChange = {handleChange} value = {searchTerm} placeholder = "search for your favourite movies" />
            <input type = "submit" value = "search" onClick = {searchFunction} /> 
        </form>
    );
};

export default Search;