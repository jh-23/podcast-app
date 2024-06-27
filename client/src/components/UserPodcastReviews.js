import React, { useState, useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom'


function UserPodcastReviews({ podcastId }) {

    const {podcastReview, setPodcastReview} = useOutletContext();

    useEffect(() => {
        fetch(`/podcastreviews/${podcastId}`)
            .then((r) => r.json())
            .then((podcastReviews) => setPodcastReview(podcastReviews))
            .catch(error => {
                console.error('Error', error);
            });
    }, [])

    console.log(podcastReview)

    const podcastReviewList = podcastReview.map((podcastReview) => {
        return <div className='podcast-reviews'>{podcastReview.podcast_review}</div>
    })

    if(podcastReview.length < 1) return <h1>Loading...</h1>

    return(
        <div>
            <h1 className='Reviews-h1'>Reviews: </h1>
            {podcastReviewList}
        </div>
    )
}

export default UserPodcastReviews;