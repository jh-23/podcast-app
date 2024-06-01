import React from 'react';
import { Link } from 'react-router-dom';

function PodcastCard({ podcast }) {
    console.log(podcast)

    return(
        <article>
            <p>
            <Link to={`/podcastprofile/${podcast.id}`}>{podcast.channel}</Link>
            </p>
        </article>
    )
}

export default PodcastCard;