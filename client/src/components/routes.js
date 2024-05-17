import App from "./App.js"
import Login from "../Login.js"
import PodcastProfile from "./PodcastProfile.js"

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path:"/login",
                element: <Login /> 
            }
        ]
    },
    {
        path:"/profile/:id",
        element: <UserProfile />
    }

];

export default routes;