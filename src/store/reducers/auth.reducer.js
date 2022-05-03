import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios.info";
import Question from "../../components/Question/Question";
import { date } from "../../helpers/Date";

export const categoriesFetch = createAsyncThunk(
  "cat/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/categories?count=5`);
      if (!res?.data) {
        throw new Error();
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

export const cluesFetch = createAsyncThunk(
  "clues/get",
  async (id, { rejectWithValue, getState }) => {
    try {
      // let id = getState().auth.catId
      const res = await axios.get(`/category?id=${id}`);
      if (!res?.data) {
        throw new Error();
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);

export const recipePut = createAsyncThunk(
  "",
  async (data, { rejectWithValue, getState }) => {
    try {
      let token = getState().auth.user.token;
      await axios.post("", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
      const {clues,id,title}= action.payload
      console.log(clues);
      let data = {
        id,
        title,
        clues
      }
      state.categories.push(data)
      state.categories.splice(0, 1);
      console.log(data);
      // let categs = state.arr.map((item)=>{
        
      // })
      // let categs = state.categories.map((item) => {
      //   return {
      //     ...item,
      //     clues: state.clue,
      //   };
      // });
      // state.categories = categs;
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
      console.log(state.catId);
      state.loading = "loading";
    },
    [cluesFetch.fulfilled]: (state, action) => {
      console.log(state.catId);
      if (action.payload.clues.length > 5) {
        action.payload.clues.length = 5;
      }
      // console.log(action.payload);
      // for (const key in action.payload.clues) {
      // action.payload.clues={
      //   ...action.payload.clues,
      //         right: null,
      // }

      // }
      let arr = action.payload.clues.map((item) => {
        return {
          ...item,
          right: null,
        };

        // return {
        //   ...item,
        //   right: null,
        // };
      });
      // state.clues.push(clues)
      // console.log(state.clues);

      // console.log(clues);
      // console.log(clues);
      let cluess = {
        clues: arr,
      };

      
      
      state.clues.push(cluess);
      state.categories[0]={
        ...state.categories[0],
        clues:arr
      }
      
     
      // let categs = state.categories.map((item) => {
      //   return {
      //     ...item,
      //    clues:arr
      //   };
      // });
      // state.categories.push(categs)
      

      state.loading = "complete";
    },
    [cluesFetch.rejected]: (state) => {
      state.loading = "loading";
    },

    [recipePut.pending]: (state) => {
      state.loading = "loading";
    },
    [recipePut.fulfilled]: (state, action) => {
      state.loading = "complete";
    },
    [recipePut.fulfilled]: (state) => {
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



// for (let i = 0; i < state.categories.length; i++) {
//   switch (i) {
//     case 0:
//       state.categories[0] = {
//         ...state.categories[0],
//         clues: arr,
//       };
//       break;

//     case 1:
//       state.categories[1] = {
//         ...state.categories[1],
//         clues: arr,
//       };
//     break;


//     case 2:
//       state.categories[2] = {
//         ...state.categories[2],
//         clues: arr,
//       };
//     break;


//     case 3:
//       state.categories[3] = {
//         ...state.categories[3],
//         clues: arr,
//       };
//     break;


//     case 4:
//       state.categories[4] = {
//         ...state.categories[4],
//         clues: arr,
//       };
//     break;


//     default:
//       break;
//   }
// }