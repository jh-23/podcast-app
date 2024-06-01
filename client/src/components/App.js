import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import { Outlet } from 'react-router-dom';
import LoginForm from "../LoginForm";

function App() {

  const [podcasts, setPodcasts] = useState([]);
  const [podcastReview, setPodcastReview] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, [])

  useEffect(() => {
    fetch("/podcasts")
      .then((r) => r.json())
      .then((podcasts) => setPodcasts(podcasts))
  }, [])
  
  function addPodcast(newPodcast) {
    const updatedPodcastList = [...podcasts, newPodcast]
    setPodcasts(updatedPodcastList)
  }

  function handleUpdatePodcast(updatedPodcastObj) {
    const updatedPodcasts = podcasts.map((podcast) => {
      if (podcast.id === updatedPodcastObj.id) {
        return updatedPodcastObj
      } else {
        return podcast
      }
    })
    setPodcasts(updatedPodcasts)
  }

  function handleDeletePodcast(id) {
    const updatedPodcasts = podcasts.filter((podcast) => podcast.id !== id)
    setPodcasts(updatedPodcasts)
  }

  function addPodcastReview(newPodcastReview) {
    const updatedPodcastReviewList = [...podcastReview, newPodcastReview]
    setPodcastReview(updatedPodcastReviewList)
  }

  if(!user) return <LoginForm onLogin={setUser} />


  return (
    <>
      <header>
        <NavBar />
      </header>
      <Outlet context={{addPodcast, addPodcastReview, handleUpdatePodcast, handleDeletePodcast, user, setUser, podcasts, setPodcasts }} />
    </>
  )
}

export default App;

















// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<NavBar />}>
//       <Route path="/home" element={<Home />}></Route>
//       <Route path="/newpodcastform" element={<NewPodcastForm />}></Route>
//       <Route path="/podcastprofile/:id" element={<PodcastCard />}></Route>
//     </Route>
//   )
// )