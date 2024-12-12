import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (token: string | undefined, { rejectWithValue }) => {
    if (!token || typeof token !== "string") {
      return rejectWithValue("Invalid or missing token");
    }
    try {
      const response = await axios.get("http://localhost:8000/userData", {
        headers: { token: token },
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("accessToken", response.data.user.accessToken);
      localStorage.setItem("itemId", response.data.user.itemId);
      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("isverified", response.data.user.isVerified);

      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch user data"
      );
    }
  }
);

const initialState = {
  isLoading: false,
  user: {},
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export the reducer for the store
export default userSlice.reducer;
