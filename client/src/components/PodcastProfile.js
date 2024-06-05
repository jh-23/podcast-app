import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import UserPodcastReviews from './UserPodcastReviews';
import EditPodcastForm from './EditPodcastForm';
import { Link } from 'react-router-dom';
import NewPodcastForm from './NewPodcastForm';

function PodcastProfile() {

    const {handleDeletePodcast} = useOutletContext();

    const [showFormInfo, setShowFormInfo] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [editPodcast, setEditPodcast] = useState(false);
    const [podcast, setPodcast] = useState({});
    const params = useParams()
    const podcastId = params.id;

    useEffect(() => {
        fetch(`/podcasts/${podcastId}`)
            .then((r) => r.json())
            .then((podcast) => setPodcast(podcast))
            .catch(error => console.error(error))
    }, [podcastId])

    if(!podcast.channel){
        return <h1>Loading...</h1>
    }

    function handleDeleteClick() {
        fetch(`/userspodcasts/${podcastId}`, {
            method: "DELETE",
        })
        handleDeletePodcast(podcastId)
    }

    function handleReviewsClick() {
        setShowReviews(true)
    }

    function handleEditPodcast() {
        setEditPodcast(true)
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
                <button onClick={handleEditPodcast}>Edit Podcast Information</button>
                {editPodcast ? <EditPodcastForm podcastId={podcastId} podcast={podcast} setPodcast={setPodcast} /> : null}
                <br />
                {showFormInfo ? <NewPodcastForm podcastId={podcastId} /> : null}
                <button onClick={handleDeleteClick}>
                Delete Podcast
                </button>
                <br />
                <button onClick={handleReviewsClick}>See Podcast Reviews</button>
                {showReviews ? <UserPodcastReviews podcastId={podcastId} /> : null}
                <br />
                <button>Click to Add Review for this Podcast</button>
            </main>
        </>
    )
}

export default PodcastProfile;
