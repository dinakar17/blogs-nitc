import React from "react";

type Props = {
    label: string;
    placeholder: string;
    setState: (value: string) => void;
}

const InputField = ({label, setState, placeholder}: Props) => {
  return (
    <div className="">
      <label
        htmlFor="default-input"
        className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        type="text"
        id="default-input"
        className="bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default InputField;