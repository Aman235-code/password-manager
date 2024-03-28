import React from "react";
import { useState } from "react";
import { useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setpasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("icons/eye.png")) {
      ref.current.src = "icons/eyecross1.png";
      ref.current.className = "font-bold bg-slate-100 w-5 top-1";
      passwordref.current.type = "password";
    } else {
      ref.current.src = "icons/eye.png";
      ref.current.className = "p-1 w-[30]";
      passwordref.current.type = "text";
    }
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });

      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });

      alert("Password Saved Successfully")

      setform({ site: "", username: "", password: "" });
    } else {
      toast("Password Not Saved");
    }
  };

  const deletePassword = async (id) => {

    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id != id));
    
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      alert("Password is deleted")
    }
  };

  const editPassword = (id) => {
    console.log(id);
    setform({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setpasswordArray(passwordArray.filter((item) => item.id != id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    alert("Copied to Clipboard")
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-purple-200 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>

      <div className="px-2 md:px-0 md:mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700"> &lt;</span>
          Pass
          <span className="text-green-700">OP / &gt;</span>
        </h1>

        <p className="text-green-900 text-4xl text-center ">
          Your own password manager
        </p>
        <div className="flex flex-col p-4 gap-3 text-black items-center">
          <input
            className="rounded-full border border-green-500 w-full text-black p-4 py-1"
            type="text"
            name="site"
            id="site"
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website Name...."
          />
          <div className="flex-col md:flex-row flex w-full justify-between gap-8">
            <input
              className="rounded-full border border-green-500 w-full text-black p-4 py-1"
              type="text"
              name="username"
              id="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username...."
            />
            <div className="relative">
              <input
                className="rounded-full border border-green-500 w-full text-black p-4 py-1"
                type="password"
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password....."
                ref={passwordref}
              />
              <span
                className="absolute right-[6px] top-[6px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  src="icons/eye.png"
                  width={30}
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center gap-2 items-center bg-yellow-500 rounded-full px-5 border border-green-700 py-2 w-fit hover:bg-green-400"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords px-5">
          <h2 className="font-bold text-2xl py-4 ">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-2 px-3">
              <thead className=" bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center ">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="size-7 cursor-pointer  lordiconcopy"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              className="cursor-pointer"
                              src="https://cdn.lordicon.com/vzolctzz.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center">
                        <div className="flex items-center justify-center ">
                          {item.username}
                          <div
                            className="size-7 cursor-pointer lordiconcopy"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              className="cursor-pointer"
                              src="https://cdn.lordicon.com/vzolctzz.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center ">
                          {item.password}
                          <div
                            className="size-7 cursor-pointer lordiconcopy"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              className="cursor-pointer "
                              src="https://cdn.lordicon.com/vzolctzz.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center ">
                          <span
                            className="cursor-pointer mx-2"
                            onClick={() => editPassword(item.id)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/wvdxdmpi.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>

                          <span
                            className="cursor-pointer mx-2"
                            onClick={() => deletePassword(item.id)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
