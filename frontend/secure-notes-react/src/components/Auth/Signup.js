import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Divider from "@mui/material/Divider";
import Buttons from "../../utils/Buttons";
import InputField from "../InputField/InputField";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMyContext } from "../../store/ContextApi";
import { useEffect } from "react";

const Signup = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(false);
  // Access the token and setToken function using the useMyContext hook from the ContextProvider
  const { token } = useMyContext();
  const navigate = useNavigate();

  //react hook form initialization
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    setRole("ROLE_USER");
  }, []);

  const onSubmitHandler = async (data) => {
    const { username, email, password } = data;
    const sendData = {
      username,
      email,
      password,
      role: [role],
    };

    try {
      setLoading(true);
      const response = await api.post("/auth/public/signup", sendData);
      toast.success("Reagister Successful");
      reset();
      if (response.data) {
        navigate("/login");
      }
    } catch (error) {
      // Add an error programmatically by using the setError function provided by react-hook-form
      //setError(keyword,message) => keyword means the name of the field where I want to show the error

      if (
        error?.response?.data?.message === "Error: Username is already taken!"
      ) {
        setError("username", { message: "username is already taken" });
      } else if (
        error?.response?.data?.message === "Error: Email is already in use!"
      ) {
        setError("email", { message: "Email is already in use" });
      }
    } finally {
      setLoading(false);
    }
  };

  //if there is token  exist navigate to the user to the home page if he tried to access the login page
  useEffect(() => {
    if (token) navigate("/");
  }, [navigate, token]);

  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="sm:w-[450px] w-[360px]  shadow-custom py-6 sm:px-8 px-4"
      >
        <div>
          <h1 className="font-montserrat text-center font-bold text-2xl">
            Register Here Here
          </h1>
          <p className="text-slate-600 text-center">
            Enter your credentials to create new account
          </p>
          <div className="flex items-center justify-between gap-1 py-5 ">
            <a
              href={`${apiUrl}/oauth2/authorization/google`}
              className="flex gap-1 items-center justify-center flex-1 border p-2 shadow-sm shadow-slate-200 rounded-md hover:bg-slate-300 transition-all duration-300"
            >
              <span>
                <FcGoogle className="text-2xl" />
              </span>
              <span className="font-semibold sm:text-customText text-xs">
                Login with Google
              </span>
            </a>
            <a
              href={`${apiUrl}/oauth2/authorization/github`}
              className="flex gap-1 items-center justify-center flex-1 border p-2 shadow-sm shadow-slate-200 rounded-md hover:bg-slate-300 transition-all duration-300"
            >
              <span>
                <FaGithub className="text-2xl" />
              </span>
              <span className="font-semibold sm:text-customText text-xs">
                Login with Github
              </span>
            </a>
          </div>

          <Divider className="font-semibold">OR</Divider>
        </div>

        <div className="flex flex-col gap-2">
          <InputField
            label="UserName"
            required
            id="username"
            type="text"
            message="*UserName is required"
            placeholder="type your username"
            register={register}
            errors={errors}
          />{" "}
          <InputField
            label="Email"
            required
            id="email"
            type="email"
            message="*Email is required"
            placeholder="type your email"
            register={register}
            errors={errors}
          />
          <InputField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="type your password"
            register={register}
            errors={errors}
            min={6}
          />
        </div>
        <Buttons
          disabled={loading}
          onClickhandler={() => {}}
          className="bg-customRed font-semibold flex justify-center text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
          type="text"
        >
          {loading ? <span>Loading...</span> : "Register"}
        </Buttons>

        <p className="text-center text-sm text-slate-700 mt-2">
          Already have an account?{" "}
          <Link
            className="font-semibold underline hover:text-black"
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
