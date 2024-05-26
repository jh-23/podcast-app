import React from 'react';
import { Link } from 'react-router-dom';

function PodcastCard({ podcast }) {
    return(
        <article>
            <h2>{podcast.name}</h2>
            <p>
            <Link to={`/podcastprofile/${podcast.id}`}>{podcast.channel}</Link>
            </p>
        </article>
    )
}

export default PodcastCard;