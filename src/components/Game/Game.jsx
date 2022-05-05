import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../UI/Loading/Loading';
import Question from '../Question/Question';
import styles from "./Game.module.css"
import RowItems from "./RowItems"
function Game() {
  
  const { categories, show,categs } = useSelector((state) => state.auth);
  const { statSumPoints, } = useSelector((state) => state.auth.currentGame);
  
  
  
  if (!categories) {
    return <Loading />;
  }

  console.log(categs);
 
  return (
    <>
      {show  && <Question />}
      {categs.length >= 5 ?
      <div className={styles.gridCont}>
        {categs.map((item) => {
          return (
            <div key={item.id} className={styles.grid}>
              <h4>{item.title} </h4>
             <RowItems  {...item} />
            </div>
          );
        })}
      </div>
      :
      <div className={styles.gridCont}>
        {categories.map((item) => {
          return (
            <div key={item.id} className={styles.grid}>
              <h4>{item.title} </h4>
             <RowItems  {...item} />
            </div>
          );
        })}
      </div>
      }


      <div className="count">
        <h1 style={{ color: "white" }}>Счёт {statSumPoints} </h1>
      </div>
    </>
  );
}

export default Game