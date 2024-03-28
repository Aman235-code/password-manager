import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center mb-0 my-4">
      <div className="logo font-bold text-2xl text-white">
        <span className="text-green-700"> &lt;</span>
        Pass
        <span className="text-green-700">OP / &gt;</span>
      </div>
      <div className="flex top-2 text-xl mt-2">
        Created With{" "}
        <img className="w-10 mx-2 mb-2" src="icons/code.png" alt="" /> by Aman
      </div>
    </div>
  );
};

export default Footer;
