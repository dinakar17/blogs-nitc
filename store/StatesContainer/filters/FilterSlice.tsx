import { createSlice } from "@reduxjs/toolkit";
import { branches } from "../../../helpers/Options/Branch";
import { semesterOptions } from "../../../helpers/Options/Semester";

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
    setFilter: (state, action) => {
      state.branch = action.payload.branch;
      state.semester = action.payload.semester;
      state.subject = action.payload.subject;
    },
  },
});

export const { setBranch, setSemester, setSubject, setFilter } = filterSlice.actions;

export default filterSlice.reducer;
