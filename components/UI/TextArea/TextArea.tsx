import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import CustomizedTooltip from "../HTMLToolTip/HTMLTooltip";

type Props = {
  label: string;
  placeholder: string;
  setState: ActionCreatorWithPayload<any, string>;
  value: string;
};

const TextArea = ({ label, setState, placeholder, value }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <label
        htmlFor="message"
        className="flex gap-2 items-center text-base font-medium text-gray-900 dark:text-gray-400"
      >
        <span>{label}</span>
        <CustomizedTooltip name="description">
          <i className="fa-regular fa-circle-question"></i>
        </CustomizedTooltip>
      </label>
      <textarea
        // difference between value and defaultValue is that value is controlled by react and defaultValue is controlled by the browser
        value={value}
        required
        id="description"
        rows={4}
        className="block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => dispatch(setState(e.target.value))}
        placeholder={placeholder}
      />
    </>
  );
};

export default TextArea;
