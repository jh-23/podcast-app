import React from 'react';
import { Link } from 'react-router-dom';

function PodcastCard() {
    return(
        <article>
            <h2>{podcast.name}</h2>
            <p>
            <Link to={`/profile/${podcast.id}`}>View profile</Link>
            </p>
        </article>
    )
}

export default PodcastCard;