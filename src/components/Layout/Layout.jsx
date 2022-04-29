

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { addStart, clearData } from '../../store/reducers/auth.reducer'
import styles from './Layout.module.css'


function Layout() {
  const [start, setStart] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const gameStart = () => {
    dispatch(clearData())
    setStart(true)
    navigate('/game')
    dispatch(addStart())
    
    
  }

  if (!start){
    return(

      <button onClick = {()=>gameStart()} className={styles.button}>Start</button>
      
     
    )
  }

 
  return (
    <div > 
     <div className={styles.navbar}  >

       <NavLink style={{textDecoration:"none"}} to = 'game'>
         <h3>Старт</h3>
       </NavLink>
       <NavLink style={{textDecoration:"none"}} to = 'stat'>
       <h3>Статистика</h3>
       </NavLink>
     </div>
    
     
  
    
    <Outlet/>
 
    </div>
  )
}

export default Layout