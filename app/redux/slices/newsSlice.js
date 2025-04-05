import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNews } from "../../lib/fetchNews";


export const getCryptoNews = createAsyncThunk(
  "news/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const news = await fetchNews();
      return news;
    } catch (error) {
      return rejectWithValue("Failed to fetch news.");
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCryptoNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCryptoNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(getCryptoNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default newsSlice.reducer;
