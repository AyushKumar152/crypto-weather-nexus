import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWeather } from "../../lib/fetchWeather";

export const getWeatherData = createAsyncThunk(
  "weather/fetch",
  async (city, { rejectWithValue }) => {
    try {
      const response = await fetchWeather(city.toLowerCase().trim());
      if (response.cod === "404") {
        return rejectWithValue("City not found");
      }
      return response;
    } catch (err) {
      return rejectWithValue("Something went wrong.");
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    city: "",
    data: null,
    error: null,
    loading: false,
  },
  reducers: {
    setCity(state, action) {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(getWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCity } = weatherSlice.actions;
export default weatherSlice.reducer;
