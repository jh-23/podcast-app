import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import AllPodcasts from "./AllPodcasts";
import AllReviews from "./AllReviews";
import Login from "../Login";
import NavBar from "../NavBar";

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




  return <main>
          <NavBar />
          <h1>Project Client</h1>
          <AllPodcasts />
          <AllReviews />
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
          <Login onLogin={handleLogin} />
        </main>

}

export default App;
