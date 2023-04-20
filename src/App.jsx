import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import NotFound from "./pages/NotFound";
import Videos from "./pages/Videos";
import Root from "./pages/Root";
import Home from "./pages/Home";

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
        },
    ]
},
])

export default function App(props) {
    return (
        <RouterProvider router={router}/>

    );
}
