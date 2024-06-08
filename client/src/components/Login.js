import React, { useState, useEffect} from 'react';
import PodcastCard from './PodcastCard';
import { useOutletContext } from 'react-router-dom';

function Login() {

    const {user, setUser} = useOutletContext();

    const [getPodcasts, setGetPodcasts] = useState([]);

    useEffect(() => {
        fetch("/userspodcasts")
            .then((r) => r.json())
            .then((user) => setGetPodcasts(user))
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