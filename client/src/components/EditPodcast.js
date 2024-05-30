import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

function EditPodcast() {

    const handleUpdatePodcast = useOutletContext();

    const [channel, setChannel] = useState(podcast.channel)
    const [podcastStart, setPodcastStart] = useState(podcast.podcastStart)
    const [episodes, setEpisodes] = useState(podcast.episodes)
    const [image, setImage] = useState(podcast.image)
    const [rating, setRating] = useState(podcast.rating)

    function handleSubmit(e) {
        e.preventDefault()

        fetch(`/podcasts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                channel,
                podcastStart,
                episodes,
                image,
                rating
            )
        })
            .then((r) => r.json())
            .then((updatedPodcast) => handleUpdatePodcast(updatedPodcast))
    }

    return(
            <form className='edit-podcast-info' onSubmit={handleSubmit}>
                    <label>Channel: </label>
                    <input type="text" name="channel" placeholder="Podcast name" value={channel} onChange={(e) => setChannel(e.target.value)} />
                    <br />
                    <label>Podcast Start (Year): </label>
                    <input type="text" name="podcast start" placeholder="Podcast start" value={podcastStart} onChange={(e) => setPodcastStart(e.target.value)} />
                    <br />
                    <label>Number of Episodes: </label>
                    <input type="text" name="number of episodes" placeholder="Number of episodes" value={episodes} onChange={(e) => setEpisodes(e.target.value)} />
                    <br />
                    <label>Podcast Image URL: </label>
                    <input type="text" name="podcast image" placeholder="Podcast image" value={image} onChange={(e) => setImage(e.target.value)} />
                    <br />
                    <label>Podcast Rating: </label>
                    <input type="text" name="podcast rating" placeholder="Podcast rating" value={rating} onChange={(e) => setRating(e.target.value)} />
                    <br />
                    <button type="submit">Submit</button>
            </form>
    )
}

export default EditPodcast;