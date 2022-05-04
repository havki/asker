import { createSlice} from "@reduxjs/toolkit";
import { date } from "../../helpers/Date";
import { cluesFetch,categoriesFetch } from "../asyncActions/clues";



export const authSlice = createSlice({
  name: "auth",
  initialState: {
    needed: null,
    questId: null,
    clues: [],
    clue: null,
    questValue: 0,
    user: null,
    loading: "",
    categories: null,
    show: false,
    catId: null,
    questionData: null,
    currentGame: {
      statCount: 0,
      statRight: 0,
      statWrong: 0,
      statSumPoints: 0,
      statStart: null,
      statEndGame: null,
    },
  },
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
    setResult: (state, action) => {
      state.result = action.payload;
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
      console.log(data);
    },
    setClue: (state, action) => {
      state.clue = action.payload;
    },
    colorChanger: (state, action) => {
      state.categories.forEach((item) => {
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
  extraReducers: {
    [categoriesFetch.pending]: (state) => {
      state.loading = "loading";
    },
    [categoriesFetch.fulfilled]: (state, action) => {
      state.categories = action.payload;

      state.loading = "complete";
    },
    [categoriesFetch.rejected]: (state) => {
      state.loading = "loading";
    },

    [cluesFetch.pending]: (state) => {
      state.loading = "loading";
    },
    [cluesFetch.fulfilled]: (state, action) => {
      const { data, id, title } = action.payload;
      console.log(action.payload);
      if (data.clues.length > 5) {
        data.clues.length = 5;
      }

      let clues = data.clues.map((item) => {
        return {
          ...item,
          right: null,
        };
      });

      let datas = {
        id,
        title,
        clues,
      };
      state.categories.push(data);
      state.categories.splice(0, 1);
      console.log(datas);

      state.loading = "complete";
    },
    [cluesFetch.rejected]: (state) => {
      state.loading = "loading";
    },

    
  },
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
