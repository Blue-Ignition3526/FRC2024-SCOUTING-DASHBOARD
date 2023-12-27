
import { Link } from "react-router-dom"
import "../styles/Nav.css"

import home from "/Icons/home.svg"
import logo from "/LogoColored.svg"
import { useState } from "react"

function Nav() {
  const [activeIcon, setActiveIcon] = useState("home")


  function handleClick (icon: string)  {
    setActiveIcon(icon)
  }

  return (
    <div id="sidebar">
      <div id="bar">
        <div id="bar-logo">
          <Link to="/"> <img src={logo} alt="Colored Logo" /> </Link>
        </div>
        <nav>
          <ul>
            <li className={activeIcon === 'home' ? 'active' : ''}>
              <Link to="/" onClick={() => handleClick('home')}> <span className="icon material-icons">home</span> </Link>
            </li>

            <li className={activeIcon === 'list' ? 'active' : ''}>
              <Link to="/" onClick={() => handleClick('list')}> <span className="icon material-icons">format_list_bulleted</span> </Link>
            </li>

            <li className={activeIcon === 'terminal' ? 'active' : ''}>
              <Link to="/" onClick={() => handleClick('terminal')}> <span className="icon material-icons">terminal</span> </Link>
            </li>
          </ul>
        </nav>
        <div id="settings">
          <Link to="/"> <span className="icon material-icons">settings</span> </Link>
        </div>
      </div>
    </div>
  )
}

export default Nav