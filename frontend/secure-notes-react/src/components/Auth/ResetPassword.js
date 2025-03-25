import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../services/api";
import { useForm } from "react-hook-form";
import { Divider } from "@mui/material";
import InputField from "../InputField/InputField";
import toast from "react-hot-toast";
import Buttons from "../../utils/Buttons";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onTouched",
  });

  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const handleResetPassword = async (data) => {
    const { password } = data;

    const token = searchParams.get("token");

    setLoading(true);
    try {
      const formData = new URLSearchParams();

      formData.append("token", token);
      formData.append("newPassword", password);
      await api.post("/auth/public/reset-password", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      toast.success("Password reset successful! You can now log in.");
      reset();
    } catch (error) {
      toast.error("Error resetting password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(handleResetPassword)}
        className="sm:w-[450px] w-[360px]  shadow-custom py-8 sm:px-8 px-4"
      >
        <div>
          <h1 className="font-montserrat text-center font-bold text-2xl">
            Update Your Password
          </h1>
          <p className="text-slate-600 text-center">
            Enter your new Password to Update it
          </p>
        </div>
        <Divider className="font-semibold pb-4"></Divider>

        <div className="flex flex-col gap-2 mt-4">
          <InputField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="enter your Password"
            register={register}
            errors={errors}
            min={6}
          />{" "}
        </div>
        <Buttons
          disabled={loading}
          onClickhandler={() => {}}
          className="bg-customRed font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
          type="text"
        >
          {loading ? <span>Loading...</span> : "Submit"}
        </Buttons>
        <p className=" text-sm text-slate-700 ">
          <Link className=" underline hover:text-black" to="/login">
            Back To Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
