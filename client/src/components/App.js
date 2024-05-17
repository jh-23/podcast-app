import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import AllPodcasts from "./AllPodcasts";
import AllReviews from "./AllReviews";
import Login from "../Login";
import NavBar from "../NavBar";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/users")
      .then((r) => r.json())
      .then((users) => console.log(users))
  }, [])

  function handleLogin(user){
    setUser(user)
  }


  return <main>
          <NavBar />
          <h1>Project Client</h1>
          <AllPodcasts />
          <AllReviews />
          <Login onLogin={handleLogin} />
        </main>

}

export default App;
