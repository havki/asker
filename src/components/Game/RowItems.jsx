import React, { useEffect, useRef } from "react";
import styles from "./Game.module.css";
import Loading from "../../UI/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuestId,
  setQuestionData,
  setQuestValue,
} from "../../store/reducers/auth.reducer";
import { cluesFetch } from "../../store/asyncActions/clues";
import { showQuestion } from "../../store/reducers/auth.reducer";

function RowItems({ id, title, clues }) {
  const dispatch = useDispatch();
  const isMounted = useRef(false);

  useEffect(() => {
    if (!clues && isMounted.current) {
      console.log('id', id)
      dispatch(cluesFetch({ id, title }));
    } else {
      isMounted.current = true;
    }
  }, [clues,id]);

  const showQuest = (item, e) => {
    dispatch(setQuestId(item.id));
    dispatch(setQuestValue(parseInt(e.target.innerText)));
    dispatch(setQuestionData(item));
    dispatch(showQuestion(true));
  };

  let counter = 0; // важно

  if (!clues) {
    return <Loading />;
  }

  return (
    <div className={styles.itemRow}>
      {clues.map((item) => {
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

            {item.right === "right" && (
              <h4
                id={counter}
                className={counter}
                style={{ backgroundColor: "green" }}
                key={item.id}
              >
                {counter}
              </h4>
            )}
            {item.right === "wrong" && (
              <h4
                id={counter}
                className={counter}
                style={{ backgroundColor: "red" }}
                key={item.id}
              >
                {counter}
              </h4>
            )}
          </>
        );
      })}
    </div>
  );
}

export default RowItems;


