import About from "../pages/About";
import Login from "../pages/Login";
import Postidpage from "../pages/PostIdPage";
import Posts from "../pages/Posts";

export const privateRoutes = [
    {path: '/about', element: About, exact: true},
    {path: '/posts', element: Posts, exact: true},
    {path: '/posts/:id', element: Postidpage, exact: true}
]

export const publicRoutes = [
    {path: '/login', element: Login, exact: true},
]