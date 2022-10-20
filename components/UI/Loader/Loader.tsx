import React from "react";
import { Dna, MagnifyingGlass, Oval, ThreeDots } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// https://mhnpd.github.io/react-loader-spinner/docs/components/

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen scale-75 md:scale-100">
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
      <div className="text-2xl text-gray-500 font-bold animate-pulse">
        Searching...
      </div>
    </div>
  );
};

export const ThreeDotsLoader = () => {
  return (
    <ThreeDots
      height="50"
      width="50"
      radius="9"
      color="#e15b64"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export const OvalLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <Oval
        height={80}
        width={80}
        color="#1840c4"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#2c3bc2"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loader;
