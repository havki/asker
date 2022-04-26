
import React, { useEffect, useState } from 'react'
import styles from './GridTable.module.css'
import axios from '../../api/axios.info'
import Loading from '../../UI/Loading/Loading'





function RowItems({
  id,
  title
}) {
  const [clues, setClues] = useState(null)
  useEffect(()=>{
    const fetchData = async () => {
    const response = await axios.get(`/category?id=${id}`);
    const res = response.data;
    setClues(res.clues);
  }
  fetchData().catch(console.error);
  },[])  
 
  if(!clues){
    return <Loading/>
  }
  return (
    <div className={styles.itemRow} >

                <h4>{title}</h4>
                {
                  clues.map((item)=>{
                    <h4>{item.value}</h4>
                    // console.log(item);
                  })
                }



                </div>
  )
}



function GridTable() {
  const [categories, setCategories] = useState(null);

  useEffect(()=>{
    const fetchData = async () => {
    const response = await axios.get(`/categories?count=5`);
    const res = response.data;
    setCategories(res);
  }
  fetchData().catch(console.error);
  },[])

  console.log(categories);

 
 
  
  if(!categories){
    return <Loading/>
  }

  return (
    <>
      <div className={styles.gridCont}>
        <div className={styles.grid}>
          {
            categories.map((item)=>{
              return(
                
                <RowItems {...item}/>
                
                
                
              )
            })
          }

          
        </div>

      </div>
    </>
  )
}

export default GridTable