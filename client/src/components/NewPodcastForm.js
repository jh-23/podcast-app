import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

function NewPodcastForm() {

    const addPodcast = useOutletContext()

    const [channel, setChannel] = useState("")
    const [podcastStart, setPodcastStart] = useState("")
    const [episodes, setEpisodes] = useState("")
    const [image, setImage] = useState("")
    const [rating, setRating] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        const formData = {
            channel: channel,
            podcastStart: podcastStart,
            episodes: episodes,
            image: image,
            rating: rating
        }
        setChannel("");
        setPodcastStart("");
        setEpisodes("");
        setImage("");
        setRating("")

        fetch('/podcasts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
        })
            .then((r) => r.json())
            .then((podcast) => addPodcast(podcast))
        }
            
        return(
            <div className="new-podcast-form">
                <br />
                <h1>Podcast Form</h1>
                <form onSubmit={handleSubmit}>
                    <h3>Add New Podcast Information Here:</h3>
                    <br />

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
    
            </div>
        )
    }

export default NewPodcastForm;

