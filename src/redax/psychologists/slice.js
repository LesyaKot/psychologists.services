import { createSlice } from "@reduxjs/toolkit";
import { fetchPsychologists, fetchPsychologistsById } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const psychologistsSlise = createSlice({
  name: "psychologists",
  initialState: {
    items: [],
    favorites: [],
    currentItem: null,
    isLoading: false,
    error: null,
    page: 1,
    totalItems: 0,
    morePages: false,
  },
  reducers: {
    incrementPage(state) {
      state.page += 1;
    },
    resetPage(state) {
      state.page = 1;
      state.items = [];
    },
    chooseFavorite(state, action) {
      const psychologistsId = action.payload;
      const index = state.favorites.findIndex((item) => item.id === psychologistsId);
      if (index === -1) {
        const itemToAdd = state.items.find((item) => item.id === psychologistsId);
        if (itemToAdd) {
          state.favorites.push(itemToAdd);
        }
      } else {
        state.favorites.splice(index, 1);
      }
    },
  },

extraReducers: (builder) => {
  builder
    .addCase(fetchPsychologists.pending, handlePending)
    .addCase(fetchPsychologists.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      
      console.log("Psychologists fetched:", action.payload);
      
      state.items = [
        ...state.items,
        ...action.payload.items.filter(
          (newItem) => !state.items.some((existingItem) => existingItem.id === newItem.id)
        ),
      ];

      state.totalItems = action.payload.total;
      state.morePages = state.items.length < state.totalItems;
    })
    .addCase(fetchPsychologists.rejected, handleRejected)
    .addCase(fetchPsychologistsById.pending, handlePending)
    .addCase(fetchPsychologistsById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.currentItem = action.payload;
    })
    .addCase(fetchPsychologistsById.rejected, handleRejected);
},
});
export const psychologistsReducer = psychologistsSlise.reducer;
export const { incrementPage, resetPage, chooseFavorite } = psychologistsSlise.actions;
