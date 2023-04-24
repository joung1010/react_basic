import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import NotFound from "./router/pages/NotFound";
import Videos from "./router/pages/Videos";
import Root from "./router/pages/Root";
import Home from "./router/pages/Home";
import VideoDetail from "./router/pages/VideoDetail";

const router = createBrowserRouter([{
    path: '/',
    element: <Root/>,
    errorElement: <NotFound/>,
    children: [
        {
            index: true, element: <Home/>
        },
        {
            path: '/videos',
            element: <Videos/>
        }, {
            path: '/videos/:videoId',
            element: <VideoDetail />
        },
    ]
},
])

export default function App(props) {
    return (
        <RouterProvider router={router}/>

    );
}
