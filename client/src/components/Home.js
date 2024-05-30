import React, { useState, useEffect} from 'react';
import PodcastCard from './PodcastCard';

function Home() {

    const [user, setUser] = useState(null);
    const [podcasts, setPodcasts] = useState([])
  
    useEffect(() => {
      fetch("/users")
        .then((r) => r.json())
        .then((user) => setUser(user))
    }, [])

    

  
    useEffect(() => {
      fetch("/podcasts")
        .then((r) => r.json())
        .then((podcasts) => setPodcasts(podcasts))
    }, [])

    const podcastList = podcasts.map((podcast) => {
        return <PodcastCard key={podcast.id} podcast={podcast} />
    })

    return(
        <div>
            <h1>User's Podcasts:</h1>
            {podcastList}
        </div>
    )
}

export default Home;





            {/* <Link to={`/podcasts`}></Link> */}
            {/* {podcasts.map((podcast) => (
            <div key={podcast.id}>
              <h2>{podcast.channel}</h2>
              <p>{podcast.podcast_start}</p>
              <p>{podcast.episodes}</p>
              <img src={podcast.image} alt={podcast.channel} />
              <p>{podcast.rating}</p>
              <button>Edit</button>
              <button>Delete</button>
              <button>Add Review</button>
            </div>
          ))} */}