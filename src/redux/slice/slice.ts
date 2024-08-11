import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CovidDataResponse, DataState } from "../../types/types";


const initialState: DataState = {
  covidData: [],
  status: 'idle',
  error: null,
};
const apiUrl = 'http://localhost:3001/0'

export const fetchData = createAsyncThunk<CovidDataResponse, void>(
  "data/fetchData",
  async () => {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Could not fetch data');
    }
    const data = await response.json();
    return data;
  }
)

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.covidData = action.payload.data;
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = 'failed';
      })
  }
})

export default dataSlice;