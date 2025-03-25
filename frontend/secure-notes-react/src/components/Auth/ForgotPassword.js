import React, { useState } from "react";
import api from "../../services/api";
import { useForm } from "react-hook-form";
import InputField from "../InputField/InputField";
import Buttons from "../../utils/Buttons";
import { Divider } from "@mui/material";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMyContext } from "../../store/ContextApi";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Access the token  using the useMyContext hook from the ContextProvider
  const { token } = useMyContext();

  //react hook form initialization
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

  const onPasswordForgotHandler = async (data) => {
    //destructuring email from the data object
    const { email } = data;

    try {
      setLoading(true);

      const formData = new URLSearchParams();
      formData.append("email", email);
      await api.post("/auth/public/forgot-password", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      //reset the field by using reset() function provided by react hook form after submit
      reset();

      //showing success message
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      toast.error("Error sending password reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //if there is token  exist navigate  the user to the home page if he tried to access the login page
  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onPasswordForgotHandler)}
        className="sm:w-[450px] w-[360px]  shadow-custom py-8 sm:px-8 px-4"
      >
        <div>
          <h1 className="font-montserrat text-center font-bold text-2xl">
            Forgot Password?
          </h1>
          <p className="text-slate-600 text-center">
            Enter your email a Password reset email will sent
          </p>
        </div>
        <Divider className="font-semibold pb-4"></Divider>

        <div className="flex flex-col gap-2 mt-4">
          <InputField
            label="Email"
            required
            id="email"
            type="email"
            message="*Email is required"
            placeholder="enter your email"
            register={register}
            errors={errors}
          />{" "}
        </div>
        <Buttons
          disabled={loading}
          onClickhandler={() => {}}
          className="bg-customRed font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
          type="text"
        >
          {loading ? <span>Loading...</span> : "Send"}
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

export default ForgotPassword;
