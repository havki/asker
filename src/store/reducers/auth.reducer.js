import { createSlice} from "@reduxjs/toolkit";
import { date } from "../../helpers/Date";
import { initialState } from "./initialState";
import { extraReducers } from "./extraReducers";



export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    doSome: (state, action) => {},
    addUser: (state, action) => {
      state.user = action.payload;
    },
    showQuestion: (state, action) => {
      state.show = action.payload;
    },
    setQuestionData: (state, action) => {
      state.questionData = action.payload;
    },
    setQuestValue: (state, action) => {
      state.questValue = action.payload;
    },
    setQuestId: (state, action) => {
      state.questId = action.payload;
    },
    setCatId: (state, action) => {
      state.catId = action.payload;
    },
    setClues: (state, action) => {
      const { clues, id, title } = action.payload;
      let data = {
        id,
        title,
        clues,
      };
      state.categories.push(data);
      state.categories.splice(0, 1);
    },
    colorChanger: (state, action) => {
      state.categs.forEach((item) => {
        item.clues.forEach((item) => {
          if (item.id === state.questId) {
            item.right = action.payload;
          }
        });
      });
    },

    addRight: (state) => {
      state.currentGame.statRight += 1;
    },
    addWrong: (state) => {
      state.currentGame.statWrong += 1;
    },
    addCount: (state) => {
      state.currentGame.statCount += 1;
    },
    addStart: (state) => {
      state.currentGame.statStart = date();
    },
    addEnd: (state) => {
      state.currentGame.statEndGame = date();
    },
    addStatPoints: (state, action) => {
      state.currentGame.statSumPoints += action.payload;
    },
    clearData: (state) => {
      state.currentGame = {
        statCount: 0,
        statRight: 0,
        statWrong: 0,
        statSumPoints: 0,
        statStart: null,
        statEndGame: null,
      };
    },
  },
  extraReducers
});

export const {
  colorChanger,
  doSome,
  addUser,
  showQuestion,
  setQuestionData,
  setResult,
  setQuestId,
  addRight,
  addWrong,
  addCount,
  addStart,
  addEnd,
  setQuestValue,
  addStatPoints,
  clearData,
  setCatId,
  setClues,
  setClue,
} = authSlice.actions;
