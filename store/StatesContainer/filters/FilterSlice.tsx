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
  },
});

export const { setBranch, setSemester, setSubject } = filterSlice.actions;

export default filterSlice.reducer;
