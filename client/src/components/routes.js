import App from "./App.js"
import PodcastProfile from "./PodcastProfile.js"
import NewPodcastForm from "./NewPodcastForm.js"
import Home from "./Home.js"
import LoginForm from "./LoginForm.js"
import NewReview from "./AddPodcastReview.js"
import Logout from "./Logout.js"
import About from "./About.js"
import SignupForm from "./SignupForm.js"

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
                path: "/newpodcastform",
                element: <NewPodcastForm />
            },
            {
                path:"/podcastprofile/:id",
                element: <PodcastProfile />,

            },
            {
                path: "/newpodcastreview",
                element: <NewReview />
            },
            {
                path: "/login",
                element: <LoginForm />
            },
            {
                path:"/signupform",
                element: <SignupForm />
            },
            {
                path: "/logout",
                element: <Logout />
            },
            {
                path: "/userspodcasts",
                element: <Home />
            },
            {
                path:"/about",
                element: <About />
            }
        ]
    },
];

export default routes;