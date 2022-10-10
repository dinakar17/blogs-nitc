import React, { useEffect } from "react";
import Select from "react-select";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import {
  setSemester,
  setSubject,
} from "../../store/StatesContainer/filters/FilterSlice";
import { AppDispatch, RootState } from "../../store/store";

export const semesterOptions = [
  { value: "1", label: "1st Semester" },
  { value: "2", label: "2nd Semester" },
  { value: "3", label: "3rd Semester" },
  { value: "4", label: "4th Semester" },
  { value: "5", label: "5th Semester" },
  { value: "6", label: "6th Semester" },
  { value: "7", label: "7th Semester" },
  { value: "8", label: "8th Semester" },
];


const Semester = () => {
  const { branch, semester } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch<AppDispatch>();

  const NotBranches = ["general", "campus_placements", "sports", "arts_and_life", "nitc_clubs"];

  useEffect(() => {
    if (NotBranches.includes(branch.value)) {
      dispatch(setSemester({ value: "", label: "" }));
      dispatch(setSubject({ value: "", label: "" }));
    }
  }, [branch.value]);

  if (NotBranches.includes(branch.value)) {
    return null;
  }

  return (
    <div className="w-[200px]">
      <Select
        value={semester.value === "" ? null : semester}
        options={semesterOptions}
        placeholder="Select Semester"
        onChange={(e: any) => dispatch(setSemester(e))}
        className="z-[12]"
      />
    </div>
  );
};

export default Semester;
