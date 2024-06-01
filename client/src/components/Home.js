import React, { useState, useEffect} from 'react';
import PodcastCard from './PodcastCard';
import { useOutletContext } from 'react-router-dom';

function Home() {

    const {podcasts, setPodcasts} = useOutletContext();

    console.log(podcasts)
 
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      fetch("/users")
        .then((r) => r.json())
        .then((user) => setUser(user))
    }, [])


    useEffect(() => {
      fetch("/userspodcasts")
        .then((r) => r.json())
        .then((podcasts) => {
          const updatedPodcasts = podcasts.map((podcast) => {
            return podcast.podcast
          })
          setPodcasts(updatedPodcasts)
        })
    }, [])

    const podcastList = podcasts.map((podcast) => {
        return <PodcastCard key={podcast.id} podcast={podcast} />
    })

    if(podcasts.length < 0) return <h1>Loading...</h1>

    return(
        <div>
            <h1>User's Podcasts:</h1>
            {podcastList}
        </div>
    )
}

export default Home;
