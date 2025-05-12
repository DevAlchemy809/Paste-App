import React from 'react'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Navbar from './Paste-Components/Navbar'
import Home from './Paste-Components/Home'
import Paste from './Paste-Components/Paste'
import ViewPaste from './Paste-Components/ViewPaste'

const router = createBrowserRouter(
    [
        {
            path:"/",
            element:
            <div>
                <Navbar />
                <Home />
            </div>
        },
        {
            path:"/pastes",
            element:
            <div>
                <Navbar />
                <Paste />
            </div>
        },
        {
            path:"/pastes/:id",
            element:
            <div>
                <Navbar />
                <ViewPaste />
            </div>
        }
    ]
)

const PasteRouter = () => {
  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  )
}

export default PasteRouter
