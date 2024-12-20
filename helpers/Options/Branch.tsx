import React from "react";
import Select from "react-select";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { setBranch } from "../../store/StatesContainer/filters/FilterSlice";
import { AppDispatch, RootState } from "../../store/store";

export const branches = [
  { value: "general", label: "General" },
  { value: "campus_placements", label: "Campus Placements" },
  { value: "sports", label: "Sports" },
  { value: "arts_and_life", label: "Arts and Life" },
  { value: "nitc_clubs", label: "NITC Clubs" },
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

const Branch = () => {
  const { branch } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="text-black dark:text-white">
      <Select
        id="react-select-branch"
        value={branch.value === "" ? null : branch}
        options={branches}
        onChange={(e: any) => dispatch(setBranch(e))}
        placeholder="Select Branch"
        className="w-full"
      />
    </div>
  );
};

export default Branch;

// https://medium.com/@albertogasparin/forcing-state-reset-on-a-react-component-by-using-the-key-prop-14b36cd7448e
// Todo: Add custom styles to the select component
