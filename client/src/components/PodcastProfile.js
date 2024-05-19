import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar';

function PodcastProfile() {
    const [podcast, podcasts] = useState([]);
    const params = useParams()
    const podcastId = params.id;


    return(
        <>
            <header>
                <NavBar />
            </header>
            <main>
                <h1>Podcast Profile</h1>
            </main>
        </>
    )
}

export default PodcastProfile;