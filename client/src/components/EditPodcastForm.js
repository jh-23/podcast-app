import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Label from './Label';
import Input from './Input';

function EditPodcastForm({ podcastId, podcast, setPodcast }) {

    const {handleUpdatePodcast} = useOutletContext();
    console.log(handleUpdatePodcast);
    console.log(podcast)

    console.log(podcastId)

    const [channel, setChannel] = useState(podcast.channel)
    const [podcastStart, setPodcastStart] = useState(podcast.podcast_start)
    const [episodes, setEpisodes] = useState(podcast.episodes)
    const [image, setImage] = useState(podcast.image)
    const [rating, setRating] = useState(podcast.rating)

    console.log(podcastStart)

    function handleSubmit(e) {
        e.preventDefault()

        fetch(`/userspodcasts/${podcastId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                channel: channel,
                podcast_start: podcastStart,
                episodes: episodes,
                image: image,
                rating: rating
        })
        })
            .then((r) => r.json())
            .then((updatedPodcast) => {handleUpdatePodcast(updatedPodcast) 
            setPodcast(updatedPodcast)})
    }

    return(
            <form className='edit-podcast-info' onSubmit={handleSubmit}>
                    <Label>Channel: </Label>
                    <input type="text" name="channel" placeholder="Podcast name" value={channel} onChange={(e) => setChannel(e.target.value)} />
                    <br />
                    <Label>Podcast Start (Year): </Label>
                    <Input type="text" name="podcast start" placeholder="Podcast start" value={podcastStart} onChange={(e) => setPodcastStart(e.target.value)} />
                    <br />
                    <Label>Number of Episodes: </Label>
                    <Input type="text" name="number of episodes" placeholder="Number of episodes" value={episodes} onChange={(e) => setEpisodes(e.target.value)} />
                    <br />
                    <Label>Podcast Image URL: </Label>
                    <Input type="text" name="podcast image" placeholder="Podcast image" value={image} onChange={(e) => setImage(e.target.value)} />
                    <br />
                    <Label>Podcast Rating: </Label>
                    <Input type="text" name="podcast rating" placeholder="Podcast rating" value={rating} onChange={(e) => setRating(e.target.value)} />
                    <br />
                    <button type="submit">Submit</button>
            </form>
    )
}

export default EditPodcastForm;