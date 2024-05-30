import React, { useState, useEffect} from 'react';
import PodcastCard from './PodcastCard';

function Login() {

    // pass down user and setuser state
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [getPodcasts, setGetPodcasts] = useState([]);

    useEffect(() => {
        fetch("/userspodcasts")
            .then((r) => r.json())
            .then((getPodcasts) => setGetPodcasts(getPodcasts))
    }, [])

    console.log(getPodcasts);


    return(
        <div>
            {getPodcasts.map((getPodcast) => {
                return <PodcastCard key={getPodcast.id} getPodcast={getPodcast} />
})}
        </div>
    )
}

export default Login;