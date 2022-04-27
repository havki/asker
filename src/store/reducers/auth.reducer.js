import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios.info";
import Question from "../../components/Question/Question";

export const categoriesFetch = createAsyncThunk(
  "cat/get",
  async(_,{rejectWithValue,}) => {
    try {
      const res = await axios.get(`/categories?count=5`);
      if(!res?.data){
        throw new Error();

      }
      return res.data;
      
    }
    catch(error){
      return rejectWithValue(error.res.data)
    }
  }
)


export const recipePut = createAsyncThunk(
  "",
  async (data, { rejectWithValue,getState }) => {
    try {
      let token =  getState().auth.user.token
      await axios.post("", data, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: 'david',
    loading: "",
    categories: null,
    show: false,
    questionData:null,
    
  },
  reducers: {
    doSome: (state, action) => {
      
    },
    addUser: (state,action) => {
      state.user = action.payload
    },
    showQuestion: (state,action) => {
      state.show = action.payload
    },
    setQuestionData: (state,action)=>{
      state.questionData= action.payload
    }
  },
  extraReducers: {
    [categoriesFetch.pending]: (state) => {
      state.loading= "loading"

  },
  [categoriesFetch.fulfilled]: (state,action) => {
    state.categories= action.payload
    
    state.loading= "complete"

  },
  [categoriesFetch.rejected]: (state) => {
  state.loading= "loading"

  },


  [recipePut.pending]: (state) => {
    state.loading= "loading"

  },
  [recipePut.fulfilled]: (state,action) => {
  state.loading= "complete"

  },
  [recipePut.fulfilled]: (state) => {
  state.loading= "loading"

  },

},

});

export const {doSome,addUser,showQuestion,setQuestionData} = authSlice.actions