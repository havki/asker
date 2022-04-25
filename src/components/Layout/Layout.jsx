
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div > 
     <div className="navbar" >
       <NavLink to = 'stat'>Stat</NavLink>
       <NavLink to = 'game'>Game</NavLink>
     </div>

    <Outlet/>

    </div>
  )
}

export default Layout