import App from "./App.js"
import Login from "../Login.js"
import PodcastProfile from "./PodcastProfile.js"
import NewPodcastForm from "./NewPodcastForm.js"
import Home from "./Home.js"

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path:"/newpodcastform",
                element: <NewPodcastForm />
            },
            {
                path:"/podcastprofile/:id",
                element:<PodcastProfile />
            }

        ]
    },
    {
        path:"/login",
        element: <Login /> 
    },
];

export default routes;