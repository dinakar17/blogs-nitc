import React from "react";
import Select from "react-select";

// Redux imports
import { useDispatch } from "react-redux";
import { setSemester } from "../../store/StatesContainer/filters/FilterSlice";
import { AppDispatch } from "../../store/store";

const semesterOptions = [
  { value: "1", label: "1st Semester" },
  { value: "2", label: "2nd Semester" },
  { value: "3", label: "3rd Semester" },
  { value: "4", label: "4th Semester" },
  { value: "5", label: "5th Semester" },
  { value: "6", label: "6th Semester" },
  { value: "7", label: "7th Semester" },
  { value: "8", label: "8th Semester" },
];

interface SemesterValue {
  value: string;
  label: string;
}

type SemesterProps = {
  setSemester: (semester: SemesterValue) => void;
};

const Semester = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Select
      options={semesterOptions}
      placeholder="Select Semester"
      onChange={(e: any) => dispatch(setSemester(e))}
      className="z-[12]"
    />
  );
};

export default Semester;
