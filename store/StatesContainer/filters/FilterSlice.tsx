import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  branch: { value: "", label: "" },
  semester: { value: "", label: "" },
  subject: { value: "", label: "" },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setBranch: (state, action) => {
      state.branch = action.payload;
    },
    setSemester: (state, action) => {
      state.semester = action.payload;
    },
    setSubject: (state, action) => {
      state.subject = action.payload;
    },
    resetFilters: (state) => {
      state.branch = { value: "", label: "" };
      state.semester = { value: "", label: "" };
      state.subject = { value: "", label: "" };
    },
    setFilter: (state, action) => {
      state.branch = action.payload.branch;
      state.semester = action.payload.semester;
      state.subject = action.payload.subject;
    },
  },
});

export const { setBranch, setSemester, setSubject, setFilter, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;
