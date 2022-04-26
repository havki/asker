
import React from 'react'
import { NavLink, Outlet,Routes,Route } from 'react-router-dom'
import Game from '../Game/Game'
import Stat from '../Stat/Stat'
import styles from './Layout.module.css'

function Layout() {
  return (
    <div > 
     <div className={styles.navbar}  >

       <NavLink  to = 'game'>Game</NavLink>
       <NavLink to = 'stat'>Stat</NavLink>
     </div>

  

    
 <Routes>

       <Route path = "game/" element = {<Game/>}></Route>
      <Route path = "stat" element = {<Stat/>}></Route>
        

       </Routes>

    </div>
  )
}

export default Layout