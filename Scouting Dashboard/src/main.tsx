import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './styles/index.css'

import Nav from './components/Nav.tsx'
import Home from './components/Home.tsx'

const router = createBrowserRouter([
  { 
    path: '/', 
    element: (
      <>
        <Nav />
        <Home />
      </>
    ),
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
