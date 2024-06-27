import React, { useEffect, useState } from 'react';

function AllPodcasts() {

    const [podcasts, setPodcasts] = useState([])

    useEffect(() => {
        fetch('/podcasts')
            .then((r) => r.json())
            .then((podcasts) => console.log(podcasts))
    }, [])

    const podcastList = podcasts.map(podcast => {
        return <PodcastCard />
    })

    return <h1>podcasts too!</h1>
}

export default AllPodcasts;
