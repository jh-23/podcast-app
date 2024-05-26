import App from "./App.js"
import PodcastProfile from "./PodcastProfile.js"
import NewPodcastForm from "./NewPodcastForm.js"
import Home from "./Home.js"
import LoginForm from "../LoginForm.js"

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
        path:"/loginform",
        element: <LoginForm /> 
    }
];

export default routes;