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
  async (id, { rejectWithValue,getState }) => {
    
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
    questId:null,
    clues: null,
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
      state.questValue += action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setQuestId:(state,action)=>{
      state.questId= action.payload
    },
    setCatId: (state,action)=>{
      state.catId = action.payload

    },
    setClues: (state,action)=>{
      // console.log(action.payload);
     let categs = state.categories.map((item)=>{
        return{
          ...item,
          clues:action.payload
          
        }
      })
      state.categories=categs
    },
    colorChanger:(state,action)=>{
     
      state.categories.forEach((item)=>{
        item.clues.forEach((item)=>{
          if(item.id===state.questId){
            item.right=action.payload
          } 
        })
      })

         
     
      
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
      console.log('asd');
      if (action.payload.clues.length > 5) {
        action.payload.clues.length = 5;
      }
      let arr = action.payload.clues.map((item) => {
        return {
          ...item,
          right: null,
        };
     
      });
     

      // state.clues=arr;
      //  state.clues.push(arr)

      let categs = state.categories.map((item)=>{
        return{
          ...item,
          clues:arr

          
        }
      })
      state.categories=categs
     

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
  setClues
} = authSlice.actions;
