import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';


function PodcastCard({ podcast }) {
    console.log(podcast)

    return(
        <article>
            <p>
            <Link className={"link-styles"} to={`/podcastprofile/${podcast.id}`}>{podcast.channel}</Link>
            </p>
        </article>
    )
}

export default PodcastCard;