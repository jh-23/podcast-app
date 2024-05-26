import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar';

function PodcastProfile() {
    const [podcast, setPodcasts] = useState([]);
    const params = useParams()
    const podcastId = params.id;

    useEffect(() => {
        fetch(`/podcasts/${podcastId}`)
            .then((r) => r.json())
            .then((podcast) => setPodcasts(podcast))
            .catch(error => console.error(error))
    }, [podcastId])

    if(!podcast.channel){
        return <h1>Loading...</h1>
    }

    return(
        <>
            <main>
                <h1>Podcast: {podcast.channel}</h1>
                <h3>Podcast Start (Year): {podcast.podcast_start}</h3>
                <p>Episodes: {podcast.episodes}</p>
                <p>Rating: {podcast.rating}</p>
                <img src={podcast.image} alt={podcast.channel} />
                <br />
                <button>Edit Podcast</button>
                <br />
                <button>Delete Podcast</button>
                <br />
                <button>Add Podcast Review</button>
            </main>
        </>
    )
}

export default PodcastProfile;
