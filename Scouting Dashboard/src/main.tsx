import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './styles/index.css'

import Nav from './components/Nav.tsx'
import Footer from './components/Footer.tsx'

import Home from './components/Home.tsx'
import List from './components/List.tsx'
import Terminal from './components/Terminal.tsx'
import Pits from './components/Pits.tsx'
import PitsTeams from './components/PitsTeams.tsx'

const router = createBrowserRouter([
  { 
    path: '/', 
    element: (
      <>
        <Nav route='home'/>
        <Home />
        <Footer />
      </>
    ),
  },
  { 
    path: '/list', 
    element: (
      <>
        <Nav route='list'/>
        <List />
        <Footer />
      </>
    ),
  },
  { 
    path: '/terminal', 
    element: (
      <>
        <Nav route='terminal'/>
        <Terminal />
        <Footer />
      </>
    ),
  },
  { 
    path: '/pits', 
    element: (
      <>
        <Nav route='pits'/>
        <Pits />
        <Footer />
      </>
    ),
  },
  {
    path: '/pits/:team',
    element: (
      <>
        <Nav route='pits'/>
        <PitsTeams />
        <Footer />
      </>
    ),
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
