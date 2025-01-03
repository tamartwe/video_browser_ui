"use client"; 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {YEAR_FILTER_KEY, GENRE_FILTER_KEY, SEARCH_FILTER, EMPTY_STRING} from './Consts';

const Card = ({ imageUrl, title, artist, releaseYear }) => (
  <div className="card">
    <img src={imageUrl} alt={title} />
    <div className="card-details">
      <p>Title: {title}</p>
      <p>Artist: {artist}</p>
      <p>Release Year: {releaseYear}</p>
    </div>
  </div>
);

const CardList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.API_URL);
        const yearFilter = localStorage.getItem(YEAR_FILTER_KEY);
        const genreFilter = localStorage.getItem(GENRE_FILTER_KEY);
        const searchFilter = localStorage.getItem(SEARCH_FILTER);
        let filteredVideos = response.data.videos;
        if (yearFilter != undefined && yearFilter !== EMPTY_STRING) {
          filteredVideos = filteredVideos.filter(video => video.release_year === parseInt(yearFilter));
        }
        if (genreFilter != undefined && genreFilter !== EMPTY_STRING) {
            filteredVideos = filteredVideos.filter(video => video.genre_id === parseInt(genreFilter));
        }
        if (searchFilter != null && searchFilter !== EMPTY_STRING) {
            filteredVideos = filteredVideos.filter(video => 
                video.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                video.artist.toLowerCase().includes(searchFilter.toLowerCase())
            );
        }
        setVideos(filteredVideos);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card-list">
      {videos.length === 0 ? (
        <p>No videos found</p>
      ) : (
        videos.map(video => (
          <Card
            key={video.id}
            imageUrl={video.image_url}
            title={video.title}
            artist={video.artist}
            releaseYear={video.release_year}
          />
        ))
      )}
    </div>
  );
};

export default CardList;