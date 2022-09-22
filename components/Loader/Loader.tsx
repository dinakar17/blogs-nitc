import React from "react";
import { Dna } from "react-loader-spinner";
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
      <div className="text-3xl font-bold">Loading...</div>
    </div>
  );
};

export default Loader;
