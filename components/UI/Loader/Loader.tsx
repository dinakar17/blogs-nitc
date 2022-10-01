import React from "react";
import { Dna, MagnifyingGlass } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// https://mhnpd.github.io/react-loader-spinner/docs/components/

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Dna
        visible={true}
        height="300"
        width="300"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
      <div className="text-3xl font-bold animate-pulse">Loading...</div>
    </div>
  );
};

export const MagnifyingGlassLoader = () => {
  return (
    <div className="flex flex-col items-center h-screen w-full mt-40">
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
      <div className="text-2xl text-gray-500 font-bold animate-pulse">Searching...</div>
    </div>
  );
};

export default Loader;
