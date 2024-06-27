import React, { useState, useEffect } from 'react';
import PodcastCard from './PodcastCard';
import { useOutletContext } from 'react-router-dom';
import H1 from './H1.js';

function Home() {
    const { podcasts, setPodcasts } = useOutletContext();

    const [user, setUser] = useState([]);

    useEffect(() => {
      fetch("/users")
          .then((r) => {
              if (!r.ok) {
                  throw new Error('Network response was not ok');
              }
              return r.json();
          })
          .then((user) => setUser(user))
          .catch((error) => {
              console.error('Error fetching user:', error);
              // Handle error as needed
          })
  }, [])

    useEffect(() => {
        fetch("/userspodcasts")
            .then((r) => {
                if (!r.ok) {
                    throw new Error('Network response was not ok');
                }
                return r.json();
            })
            .then((podcasts) => {
                if (podcasts.error) {
                    throw new Error(podcasts.error);
                }
                setPodcasts(podcasts);
            })
            .catch((error) => {
                console.error('Error fetching podcasts:', error);
            });
    }, [setPodcasts]);

    if (!user || !podcasts) {
        return <h1>Loading...</h1>;
    }

    if (user.length > 0 && podcasts.length > 0 && podcasts[0].user_podcast_reviews && podcasts[0].user_podcast_reviews.length > 0) {
      console.log(user)
      console.log(podcasts)
      console.log(podcasts[0].user_podcast_reviews[0].user.username)
    }


    const podcastList = podcasts?.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
    ));

    return (
        <div className='Home'>
            {podcasts.length > 0 && podcasts[0].user_podcast_reviews && podcasts[0].user_podcast_reviews.length > 0 &&
                <H1>{podcasts[0].user_podcast_reviews[0].user.username}'s Podcasts:</H1>
            }
            {podcastList}
        </div>
    );
}

export default Home;
