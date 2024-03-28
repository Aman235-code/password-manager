import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white px-24">
      <div className="mycontainer  text-black flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-2xl text-white">
          <span className="text-green-700"> &lt;</span>
          Pass
          <span className="text-green-700">OP/ &gt;</span>
        </div>

        <button className="text-white flex gap-2">
          <img
            src="icons/github2.jpg"
            className="rounded-full invert ring-white ring-1"
            width={35}
            alt="github"
          />
          <span className="top-4 py-1 text-xl">
            <a href="https://github.com/Aman235-code/" target="_blank">
              GitHub
            </a>
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
