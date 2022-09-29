import React from "react";
import Select from "react-select";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { setBranch } from "../../store/StatesContainer/filters/FilterSlice";
import { AppDispatch, RootState } from "../../store/store";

export const branches = [
  {value: "general", label: "General"},
  {value: "campus_placements", label: "Campus Placements"},
  { value: "cse", label: "Computer Science and Engineering" },
  { value: "ece", label: "Electronics and Communication Engineering" },
  { value: "eee", label: "Electrical and Electronics Engineering" },
  { value: "mech", label: "Mechanical Engineering" },
  { value: "civil", label: "Civil Engineering" },
  { value: "chem", label: "Chemical Engineering" },
  { value: "bio", label: "Bio Technology" },
  { value: "prod", label: "Production Engineering" },
  { value: "ep", label: "Engineering Physics" },
];

interface BranchValue {
  value: string;
  label: string;
}

type BranchProps = {
  setBranch: (branch: BranchValue) => void;
};

const Branch = () => {
  const {branch} = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch<AppDispatch>();
  
  return (
    <Select
      value={branch}
      options={branches}
      onChange={(e: any) => dispatch(setBranch(e))}
      placeholder="Select Branch"
      className="z-[10001]"
    />
  );
};

export default Branch;
