import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";

type Props = {
  label: string;
  placeholder: string;
  setState: ActionCreatorWithPayload<any, string>;
};

const TextArea = ({ label, setState, placeholder }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <label
        htmlFor="message"
        className="block text-base font-medium text-gray-900 dark:text-gray-400"
      >
        {label}
      </label>
      <textarea
        required
        id="message"
        rows={4}
        className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => dispatch(setState(e.target.value))}
        placeholder={placeholder}
        defaultValue={""}
      />
    </>
  );
};

export default TextArea;
