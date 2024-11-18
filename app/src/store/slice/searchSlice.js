import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "searchResult",
  initialState: {
    value: [],
    isLoading: false,
    isError: false,
    searchRef:''
  },
  reducers: {
    setSearchResult: (state, actions) => {
      state.value = [...actions.payload];
      state.isLoading = false;
      state.isError = false;
    },
    setError: (state, actions) => {
      state.isError = actions.payload;
      state.isLoading = false;
      state.value = [];
    },
    setLoading: (state, actions) => {
      state.isLoading = actions.payload;
      state.isError = false;
      state.value = [];
    },
    setSearchValueReference: (state, actions) => {
      state.searchRef = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearchResult,setError,setLoading,setSearchValueReference } = searchSlice.actions;

export default searchSlice.reducer;
