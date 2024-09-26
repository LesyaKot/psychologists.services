import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://psychologists-7c733-default-rtdb.europe-west1.firebasedatabase.app";

export const fetchPsychologists = createAsyncThunk(
  "psychologists/fetchAll",
  async (_, thunkAPI) => {
    const { psychologists, filters } = thunkAPI.getState();

    const { page } = psychologists;
    const { name, avatar_url, experience, reviews, price_per_hour, rating, license, specialization, initial_consultation, about } =
      filters.filterParams;

      const params = new URLSearchParams({
        page,
        limit: 3,
        ...(name && { name }),
        ...(avatar_url && { avatar_url }),
        ...(experience && { experience }),
        ...(reviews && { reviews }),
        ...(price_per_hour && { price_per_hour }),
        ...(rating && { rating }),
        ...(license && { license }),
        ...(specialization && { specialization }),
        ...(initial_consultation && { initial_consultation }),
        ...(about && { about }),
      });
    try {
      const response = await axios.get(`/psychologists?${params}`);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const fetchPsychologistsById = createAsyncThunk(`psychologists/fetchPsychologistsById`, async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/psychologists/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });