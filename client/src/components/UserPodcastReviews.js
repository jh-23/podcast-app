import React, { useState, useEffect } from 'react';


function UserPodcastReviews({ podcastId }) {

    const [podcastReviews, setPodcastReviews] = useState([]);

    useEffect(() => {
        fetch(`/podcastreviews/${podcastId}`)
            .then((r) => r.json())
            .then((podcastReviews) => setPodcastReviews(podcastReviews))
            .catch(error => {
                console.error('Error', error);
            });
    }, [])

    console.log(podcastReviews)

    const podcastReviewList = podcastReviews.map((podcastReview) => {
        return <div className='podcast-reviews'>{podcastReview.podcast_review}</div>
    })

    if(podcastReviews.length < 1) return <h1>Loading...</h1>

    return(
        <div>
            <h1>Reviews: </h1>
            {podcastReviewList}
        </div>
    )
}

export default UserPodcastReviews;