import {createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios.info";

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
  async ({ id, title }, { rejectWithValue, getState }) => {
    try {
      const res = await axios.get(`/category?id=${id}`);
      if (!res?.data) {
        throw new Error();
      }
      return { data: res.data, id, title };
    } catch (error) {
      return rejectWithValue(error.res.data);
    }
  }
);
