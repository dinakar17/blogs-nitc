import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";

type Props = {
    label: string;
    placeholder: string;
    setState: ActionCreatorWithPayload<any, string>;
    value: string;
}

const InputField = ({label, setState, placeholder, value}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="">
      <label
        htmlFor="default-input"
        className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        required
        type="text"
        id="title"
        data-cy="blog-title"
        value={value}
        className="bg-gray-50 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => dispatch(setState(e.target.value))}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
