
import { Link } from "react-router-dom"
import "../styles/Nav.css"

import logo from "/LogoColored.svg"
import { useState } from "react"

import Settings from "./Settings"

function Nav({route}: {route: string}) {
  const [activeIcon, setActiveIcon] = useState(route)


  function handleClick (icon: string)  {
    setActiveIcon(icon)
  }

  return (
    <>
      <div id="sidebar">
        <div id="vertical-bar" className="card">
          <div id="bar-logo">
            <Link to="/"> <img src={logo} alt="Colored Logo" /> </Link>
          </div>
          <nav>
            <ul>
              <li className={activeIcon === 'home' ? 'active' : ''}>
                <Link to="/" onClick={() => handleClick('home')}> <span className="icon material-icons">browse</span> </Link>
              </li>

              <li className={activeIcon === 'list' ? 'active' : ''}>
                <Link to="/list" onClick={() => handleClick('list')}> <span className="icon material-icons">format_list_bulleted</span> </Link>
              </li>

              <li className={activeIcon === 'terminal' ? 'active' : ''}>
                <Link to="/terminal" onClick={() => handleClick('terminal')}> <span className="icon material-icons">terminal</span> </Link>
              </li>
              <li className={activeIcon === 'pits' ? 'active' : ''}>
                <Link to="/pits" onClick={() => handleClick('pits')}> <span className="icon material-icons">front_loader</span> </Link>
              </li>
            </ul>
          </nav>
          <Settings />
        </div>
      </div>
    </>
  )
}



export default Nav