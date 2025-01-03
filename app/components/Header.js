"use client"; 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, FormHelperText, Select, MenuItem } from '@mui/material';
import {YEAR_FILTER_KEY, GENRE_FILTER_KEY, EMPTY_FILTER , EMPTY_FILTER_LBL, SEARCH_FILTER, EMPTY_STRING} from './Consts';

const Header = () => {
    const [releaseYears, setReleaseYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(localStorage.getItem(YEAR_FILTER_KEY) || '');
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(localStorage.getItem(GENRE_FILTER_KEY) || '');
    const [searchValue, setSearchValue] = useState(localStorage.getItem(SEARCH_FILTER) || '');

    useEffect(() => {
        axios.get(process.env.API_URL)
            .then(response => {
                const uniqueYears = [...new Set(response.data.videos.map(video => video.release_year))];
                setReleaseYears([EMPTY_FILTER_LBL, ...uniqueYears]);
                setGenres([{id : EMPTY_FILTER, name: EMPTY_FILTER_LBL},...response.data.genres]);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    const handleSearchChange = (event) => {
        const newSearchValue = event.target.value;
        setSearchValue(newSearchValue);
        if (newSearchValue.length % 3 === 0) {
            localStorage.setItem(SEARCH_FILTER, newSearchValue);
            window.location.reload();
        }
    };

    const handleYearChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedYear(selectedValue);
        if (selectedValue === EMPTY_FILTER_LBL) {
            localStorage.setItem(YEAR_FILTER_KEY, EMPTY_STRING);
        } else {
            localStorage.setItem(YEAR_FILTER_KEY, selectedValue);
        }
        window.location.reload();
    };


    const handleGenreChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedGenre(selectedValue);
        if (selectedValue === EMPTY_FILTER) {
            localStorage.setItem(GENRE_FILTER_KEY, EMPTY_STRING);
        } else {
            localStorage.setItem(GENRE_FILTER_KEY, event.target.value);
        }
        window.location.reload();
        
    };

    return (
        <header className="page_header_style">
            <h1>Video Browser</h1>
            <div className="search-container">
            <input 
                type="text" 
                placeholder="Search video" 
                value={searchValue} 
                onChange={handleSearchChange} />
                <div className="select-container">
                    <FormControl>
                        <Select value={selectedYear} onChange={handleYearChange}>
                            {releaseYears.map(year => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Search By Year</FormHelperText>
                    </FormControl>
                </div>
                <div className="select-container">
                    <FormControl>
                        <Select value={selectedGenre} onChange={handleGenreChange}>
                            {genres.map(genre => (
                                <MenuItem key={genre.id} value={genre.id}>
                                    {genre.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>Search By Genre</FormHelperText>
                    </FormControl>
                </div>
            </div>
        </header>
    );
};

export default Header;