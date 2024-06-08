import React from 'react';
import { Link } from 'react-router-dom';

function PodcastReviewsCard({ podcast }) {

    return(
        <article>
            <p>
                <Link to={`/podcastprofile/${podcast.id}`}>{podcast.podcast_review}</Link>
            </p>
        </article>
    )
}

export default PodcastReviewsCard;