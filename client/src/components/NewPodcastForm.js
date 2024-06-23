import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import H1 from './H1';
import H4 from './H4';
import Input from './Input';
import Label from './Label';

function NewPodcastForm({ podcastId }) {

    const {addPodcast} = useOutletContext();

    const [channel, setChannel] = useState("")
    const [podcastStart, setPodcastStart] = useState("")
    const [episodes, setEpisodes] = useState("")
    const [image, setImage] = useState("")
    const [rating, setRating] = useState("")

    function handleSubmit(e) {
        e.preventDefault();
        const formData = {
            channel: channel,
            podcast_start: podcastStart,
            episodes: episodes,
            image: image,
            rating: rating
        }
        setChannel("");
        setPodcastStart("");
        setEpisodes("");
        setImage("");
        setRating("")

        console.log(formData);

        fetch('/userspodcasts', {
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
                <H1>Podcast Form</H1>
                <form onSubmit={handleSubmit}>
                    <H4>Add New Podcast Information:</H4>
                    <br />

                    <Label>Channel: </Label>
                    <Input type="text" name="channel" placeholder="Podcast name" value={channel} onChange={(e) => setChannel(e.target.value)} />
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
    
            </div>
        )
    }

export default NewPodcastForm;

