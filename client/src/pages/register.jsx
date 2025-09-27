import React from "react";
import { FaUser } from "react-icons/fa";
import logo from "../assets/icons/drawer_logo.svg";
import { MdLock } from "react-icons/md";
import { Await, Form, redirect, useActionData } from "react-router-dom";
import fetch from "../utils/custom-axios";
import { MdModelTraining } from "react-icons/md";
import { PiVoicemailBold } from "react-icons/pi";
import { BsPassFill } from "react-icons/bs";
import { PiBrainFill } from "react-icons/pi";

export const Loader = async () => {
  try {
    const { data } = await fetch("/user/current-user", "get");
    if (data?.user?.role != "superadmin") {
      return ;
    }
    return data;
  } catch (error) {
    console.log(error);
    return ;
  }
};

export const Action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);

    const machine = await fetch("/machine", "post", data);

    const user = await fetch("/register", "post", data);

    // console.log(user,machine);

    // queryClient.invalidateQueries(["currentUser"]);
    return redirect("/");
  } catch (error) {
    return error;
  }
};

const Register = () => {
  const data = useActionData();
  console.log(data);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-black">
      <Form method="post" className="flex flex-col gap-4 w-5/6 lg:w-2/5">
        <div className="flex justify-center ">
          <img src={logo} />
        </div>
        <div className="flex justify-between gap-3 relative lg:flex-row flex-col">
          <div className="flex-grow basis-2/5">
            <div className="relative flex items-center rounded-xl bg-white px-3">
              <FaUser className="text-black text-lg" />
              <input
                name="name"
                className="p-4 w-full rounded-xl focus:outline-none text-black bg-white"
                type="text"
                placeholder="Name"
                required
              />
            </div>
          </div>
          <div className="flex-grow basis-2/5">
            <div className="relative flex items-center rounded-xl bg-white px-3">
              <PiVoicemailBold className="text-black text-lg" />
              <input
                name="email"
                className="p-4 w-full rounded-xl focus:outline-none text-black bg-white "
                type="email"
                placeholder="Email"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-3 relative lg:flex-row flex-col">
          <div className="flex-grow basis-2/5">
            <div className="relative flex items-center rounded-xl bg-white px-3">
              <MdLock className="text-black text-2xl" />
              <input
                name="password"
                className="p-4 w-full rounded-xl focus:outline-none text-black bg-white"
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </div>
          <div className="flex-grow basis-2/5">
            <div className="relative flex items-center rounded-xl bg-white px-3">
              <BsPassFill className="text-black text-2xl" />
              <input
                name="machineId"
                className="p-4 w-full rounded-xl focus:outline-none text-black bg-white"
                type="text"
                placeholder="Machine Id"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-3 relative lg:flex-row flex-col">
          <div className="flex-grow basis-2/5">
            <div className="relative flex items-center rounded-xl bg-white px-3">
              <MdModelTraining className="text-black text-2xl" />
              <input
                name="model"
                className="p-4 w-full rounded-xl focus:outline-none text-black bg-white"
                type="text"
                placeholder="Model"
                required
              />
            </div>
          </div>
          <div className="flex-grow basis-2/5">
            <div className="relative flex items-center rounded-xl bg-white px-3">
              <PiBrainFill className="text-black text-2xl" />
              <input
                name="aiVersion"
                className="p-4 w-full rounded-xl focus:outline-none text-black bg-white"
                type="text"
                placeholder="Ai Version"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="rounded-xl p-3 border border-white bg-black text-white font-popping hover:bg-neutral-900"
        >
          Register
        </button>
        {data?.response?.data.msg && (
          <div
            id="passwordHelpBlock"
            className="form-text text-red-300 font-light mt-1 text-sm "
          >
            {data?.response?.data.msg}
          </div>
        )}
      </Form>
    </div>
  );
};

export default Register;
