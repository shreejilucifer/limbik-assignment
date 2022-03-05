import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  start_year: number | undefined;
  end_year: number | undefined;
  selected_movie_id: number | undefined;
}

const initialState: FilterState = {
  start_year: undefined,
  end_year: undefined,
  selected_movie_id: undefined,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateStartYear: (state, action: PayloadAction<number>) => {
      state.start_year = action.payload;
    },
    updateEndYear: (state, action: PayloadAction<number>) => {
      state.end_year = action.payload;
    },
    setMovieId: (state, action: PayloadAction<number>) => {
      state.selected_movie_id = action.payload;
    },
  },
});

export const { updateEndYear, updateStartYear, setMovieId } =
  filterSlice.actions;
export default filterSlice.reducer;
