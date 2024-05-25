import React, { useEffect, useState } from "react";
import AllPodcasts from "./AllPodcasts";
import AllReviews from "./AllReviews";
import Login from "../Login";
import NavBar from "../NavBar";
import NewPodcastForm from "./NewPodcastForm";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import PodcastCard from "./PodcastCard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavBar />}>
      <Route index element={<App />}></Route>
      <Route path="newpodcastform" element={<NewPodcastForm />}></Route>
      <Route path="profile" element={<PodcastCard />}></Route>
    </Route>
  )
)

function App() {
  const [user, setUser] = useState(null);
  const [podcasts, setPodcasts] = useState([])

  useEffect(() => {
    fetch("/users")
      .then((r) => r.json())
      .then((users) => console.log(users))
  }, [])

  useEffect(() => {
    fetch("/podcasts")
      .then((r) => r.json())
      .then((podcasts) => setPodcasts(podcasts))
  }, [])

  console.log(podcasts)

  function handleLogin(user){
    setUser(user)
  }

  function addPodcast(newPodcast) {
    const updatedPodcastList = [...podcasts, newPodcast]
    console.log(updatedPodcastList)
    setPodcasts(updatedPodcastList)
  }



  return (
    <>
        <RouterProvider router={router} />

        <h1>Project Client</h1>
          {podcasts.map((podcast) => (
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
          ))}
    </>
  )
}

export default App;
