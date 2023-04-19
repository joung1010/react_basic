import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([{
    path: '/',
    element: <p>Home</p>,
    errorElement:<p>Error</p>
}, {
    path: '/videos',
    element: <p>Videos</p>
}
])

export default function App(props) {
    return (
        <RouterProvider router={router}/>

    );
}
