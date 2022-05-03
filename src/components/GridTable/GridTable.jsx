import React, { useEffect, useRef, useState } from "react";
import styles from "./GridTable.module.css";
import axios from "../../api/axios.info";
import Loading from "../../UI/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  categoriesFetch,
  cluesFetch,
  setCatId,
  setClue,
  setClues,
  setQuestId,
  setQuestionData,
  setQuestValue,
  setResult,
} from "../../store/reducers/auth.reducer";
import { showQuestion } from "../../store/reducers/auth.reducer";
import cn from "classnames";
import "./GridTable.css";
import Question from "../Question/Question";
import { style } from "@mui/system";

function RowItems({ id, title ,clues}) {
  const dispatch = useDispatch();
  // const [clues, setClues] = useState(null)
  const [pressed, setPressed] = useState(false);
  // const clues = useSelector((state) => state.auth.clues);
  const categories = useSelector((state) => state.auth.categories);
  const user = useSelector((state) => state.auth.user);
  const { show, result } = useSelector((state) => state.auth);
  const reff = useRef(null);

  const isMounted = useRef(false);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     console.log('fetching');
  //     dispatch(cluesFetch(id));
  //   } else {
  //     isMounted.current = true;
  //   }
  // }, [dispatch, id]);


  // const isFirstRender = useRef(true);

  // useEffect(() => {
  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //   } else {
  //     console.log("fetching");
  //     dispatch(cluesFetch(id));
  //   }
  // }, [dispatch, id]);
  
  
  
  
  
  useEffect(() => {
    if(!clues && isMounted.current){
      
      
       const fetchData = async () => {
           const response = await axios.get(`/category?id=${id}`);
 
           const res = response.data;
           if (res.clues.length > 5) {
               res.clues.length = 5;
             }
             let clues = res.clues.map((item) => {
                 return {
                   
                   

                     ...item,
                     right: null,
                  
                   };
                 });
              
                //  setClues(arr);
                // dispatch(setClue(clues))
                 dispatch(setClues({clues,id,title,}))

               };
               fetchData().catch(console.error);
              //  dispatch(cluesFetch(id));
              //  dispatch(setCatId(id))
              
              
    }
    else {
          isMounted.current = true;
        }
  }, [dispatch,id]);


  // console.log(clues);

  const showQuest = (item, e) => {
    dispatch(setQuestId(item.id));
    dispatch(setQuestValue(parseInt(e.target.innerText)));
    if (e.target.innerText !== "") {
      dispatch(setQuestionData(item));
      dispatch(showQuestion(true));
      e.target.innerText = "";
    }
  };

  let counter = 0; // важно

  if (!clues) {
    return <Loading />;
  }
  return (
    <div className={styles.itemRow}>
      {clues.map((item) => {
        // console.log(item);
        counter += 100;
        return (
          <>
            {!item.right && (
              <h4
                id={counter}
                className={counter}
                onClick={(e) => showQuest(item, e)}
                key={item.id}
              >
                {counter}
              </h4>
            )}
            
            {
              (item.right === 'right') && (
                <h4
                id={counter}
                className={counter}
                style={{backgroundColor:"green"}}
                // onClick={(e) => showQuest(item, e)}
                key={item.id}
              >
                {counter}
              </h4>
              )
            }
            {
              (item.right === 'wrong') && (
                <h4
                id={counter}
                className={counter}
                style={{backgroundColor:"red"}}
                // onClick={(e) => showQuest(item, e)}
                key={item.id}
              >
                {counter}
              </h4>
              )
            }
          </>

          // {cn(styles.cell,{[styles.active]:pressed})}
        );
      })}
    </div>
  );
}

function GridTable() {
  const dispatch = useDispatch();
  const { categories, show } = useSelector((state) => state.auth);
  const { statSumPoints } = useSelector((state) => state.auth.currentGame);

  useEffect(() => {}, []);

  if (!categories) {
    return <Loading />;
  }

  const foo = (e) => {
    e.target.innerText = "sda";
    e.target.className = "some";
  };

  return (
    <>
      {show && <Question />}

      <div className={styles.gridCont}>
        {categories.map((item) => {
          // console.log(item);
          return (
            <div key={item.id} className={styles.grid}>
              <h4 onClick={(e) => foo(e)}>{item.title} </h4>
              <RowItems key={item.id} {...item} />
            </div>
          );
        })}
      </div>
      <div className="count">
        <h1 style={{ color: "white" }}>Счёт {statSumPoints} </h1>
      </div>
    </>
  );
}

export default GridTable;
