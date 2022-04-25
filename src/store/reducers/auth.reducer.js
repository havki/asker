import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios.info";

export const profileFetch = createAsyncThunk(
  "",
  async(_,{rejectWithValue,}) => {
    try {
      const res = await axios.get(``);
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
    user: null,
    loading: "",
  },
  reducers: {
    doSome: (state, action) => {
      
    },
    addUser: (state,action) => {
      state.user = action.payload
    }
  },
  extraReducers: {
    [profileFetch.pending]: (state) => {
      state.loading= "loading"

  },
  [profileFetch.fulfilled]: (state,action) => {
    state.loading= "complete"

  },
  [profileFetch.fulfilled]: (state) => {
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

export const {doSome,addUser} = authSlice.actions