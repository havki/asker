
import React, { useEffect, useState } from 'react'
import styles from './GridTable.module.css'
import axios from '../../api/axios.info'
import Loading from '../../UI/Loading/Loading'
import Question from '../Question/Question'
import { useDispatch, useSelector } from 'react-redux'
import {  categoriesFetch, setQuestionData } from '../../store/reducers/auth.reducer'
import { showQuestion } from '../../store/reducers/auth.reducer'





function RowItems({
  id,
  title
}) {
  const dispatch = useDispatch()
  const [clues, setClues] = useState(null)
 
  useEffect(()=>{
    const fetchData = async () => {
      const response = await axios.get(`/category?id=${id}`);
      
      const res = response.data;
      if(res.clues.length > 5){
        res.clues.length = 5
      }
      setClues(res.clues);
    
  }
  fetchData().catch(console.error);
  },[])  

  const showQuest = (item,e) => {
    
    console.log(item);
    dispatch(setQuestionData(item))
    dispatch(showQuestion(true))
    e.target.innerText= ''
  }


  // console.log(clues);

  let arr = ['5','4','3','2','1','4']
  let counter = 0;
 
 
  if(!clues){
    return <Loading/>
  }
  return (

    
    
    <div className={styles.itemRow} >

                
                {
                  
                  clues.map((item)=>{
                    // console.log(item);
                    counter += 100
                    return(
                      <h4 id={counter} onClick={(e)=>showQuest(item,e)} key={item.id}>{counter}</h4>
                     
                    
                    )
                    

                    
                  })
                }



                </div>
  )
}



function GridTable() {
 
  const dispatch = useDispatch();
  const {categories} = useSelector((state)=> state.auth)

  useEffect(()=>{
    dispatch(categoriesFetch())
  
  },[])

 


 
  
  if(!categories){
    return <Loading/>
  }



  return (

    <>
      
      <div className={styles.gridCont}>
      
          {
            categories.map((item)=>{
              return(
                <div key={item.id} className={styles.grid}>
                <h4>{item.title}</h4>
                <RowItems key={item.id} {...item}/>
                
                </div>
                
              )
            })
          }

          
      

      </div>
    </>
  )
}

export default GridTable