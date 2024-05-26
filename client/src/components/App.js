import React, { useEffect, useState } from "react";
import NavBar from "../NavBar";
import { Outlet } from 'react-router-dom';

function App() {

  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    fetch("/podcasts")
      .then((r) => r.json())
      .then((podcasts) => setPodcasts(podcasts))
  }, [])
  
  function addPodcast(newPodcast) {
    const updatedPodcastList = [...podcasts, newPodcast]
    setPodcasts(updatedPodcastList)
  }

  return (
    <>
      <header>
        <NavBar />
      </header>
      <Outlet context={addPodcast} />
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