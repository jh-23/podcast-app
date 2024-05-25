import React, { useEffect, useState } from "react";
import AllPodcasts from "./AllPodcasts";
import AllReviews from "./AllReviews";
import Login from "../Login";
import NavBar from "../NavBar";
import NewPodcastForm from "./NewPodcastForm";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import PodcastCard from "./PodcastCard";
import Home from "./Home";
import { Outlet } from 'react-router-dom';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<NavBar />}>
//       <Route path="/home" element={<Home />}></Route>
//       <Route path="/newpodcastform" element={<NewPodcastForm />}></Route>
//       <Route path="/podcastprofile/:id" element={<PodcastCard />}></Route>
//     </Route>
//   )
// )

function App() {

  return (
    <>
      <header>
        <NavBar />
      </header>
      <Outlet />
    </>
  )
}

export default App;


  // function addPodcast(newPodcast) {
  //   const updatedPodcastList = [...podcasts, newPodcast]
  //   console.log(updatedPodcastList)
  //   setPodcasts(updatedPodcastList)
  // }
