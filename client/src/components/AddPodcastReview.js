import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';


function AddPodcastReview({ podcastId }) {

    const {addPodcastReview, user} = useOutletContext();

    const [podcastReview, setPodcastReview] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/userspodcastaddreview', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                podcast_review: podcastReview,
                user_id: user.id,
                podcast_id: podcastId
            }),
        })
            .then((r) => r.json())
            .then((newReview) => addPodcastReview(newReview))
    }

    return(

        <form className="new-podcast-review" onSubmit={handleSubmit}>
            <input
            type="text"
            name="podcast-review"
            autoComplete='off'
            value={podcastReview}
            onChange={(e) => setPodcastReview(e.target.value)}
            />
            <br />
            <button type="submit">Add Podcast Review</button>
        </form>
    )
}

export default AddPodcastReview;