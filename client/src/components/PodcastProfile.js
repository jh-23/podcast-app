import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import UserPodcastReviews from './UserPodcastReviews';
import EditPodcastForm from './EditPodcastForm';
import NewPodcastForm from './NewPodcastForm';
import AddPodcastReview from './AddPodcastReview';
import H1 from './H1';
import H4 from './H4';
import P from './P';

function PodcastProfile() {

    const {handleDeletePodcast} = useOutletContext();

    const [showFormInfo, setShowFormInfo] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [editPodcast, setEditPodcast] = useState(false);
    const [podcast, setPodcast] = useState({});
    const [addNewReview, setAddNewReview] = useState(false);
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

    function handleAddNewPodcastReviewClick() {
        setAddNewReview(true)
    }

    return(
        <>
            <main>
                <H1>Podcast: {podcast.channel}</H1>
                <h4 className='podcast-p-paragraph'>Podcast Start (Year): {podcast.podcast_start}</h4>
                <p className='podcast-profile-p'>Episodes: {podcast.episodes}</p>
                <p className='podcast-profile-p'>Rating: {podcast.rating}</p>
                <img src={podcast.image} alt={podcast.channel} />
                <br />
                <br />
                <button onClick={handleEditPodcast}>Edit Podcast Information</button>
                {editPodcast ? <EditPodcastForm podcastId={podcastId} podcast={podcast} setPodcast={setPodcast} /> : null}
                <br />
                <br />
                {showFormInfo ? <NewPodcastForm podcastId={podcastId} /> : null}
                <button onClick={handleDeleteClick}>
                Delete Podcast
                </button>
                <br />
                <br />
                <button onClick={handleReviewsClick}>See Podcast Reviews</button>
                {showReviews ? <UserPodcastReviews podcastId={podcastId} /> : null}
                <br />
                <br />
                <button onClick={handleAddNewPodcastReviewClick}>Click to Add Review for this Podcast</button>
                {addNewReview ? <AddPodcastReview podcastId={podcastId} /> : null}
                <br />
                <br />
                
            </main>
        </>
    )
}

export default PodcastProfile;
