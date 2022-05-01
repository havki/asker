import React from 'react'
import { useSelector } from 'react-redux'
import GridTable from '../GridTable/GridTable'
import Question from '../Question/Question';
import BasicTable from '../Table/Table'

function Game() {
  const {show}  = useSelector((state)=> state.auth);
  
  return (

    
   
    <>
    
    {/* {show && <Question/>} */}
    {/* <Question/> */}
      <GridTable/>
    
    </>
  )
}

export default Game