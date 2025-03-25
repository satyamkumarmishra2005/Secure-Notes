import React from "react";
import { Link } from "react-router-dom";
import Buttons from "../utils/Buttons";
import { motion } from "framer-motion";
import Brands from "./LandingPageCom/Brands/Brands";
import State from "./LandingPageCom/State";
import Testimonial from "./LandingPageCom/Testimonial/Testimonial";
import { useMyContext } from "../store/ContextApi";

const fadeInFromTop = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};
const fadeInFromBotom = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const LandingPage = () => {
  // Access the token  state by using the useMyContext hook from the ContextProvider
  const { token } = useMyContext();

  return (
    <div className="min-h-[calc(100vh-74px)] flex justify-center">
      <div className="lg:w-[80%] w-full py-16  space-y-4  ">
        <motion.h1
          className="font-montserrat uppercase text-headerColor  xl:text-headerText md:text-4xl text-2xl mx-auto text-center font-bold sm:w-[95%] w-full"
          initial="hidden"
          animate="visible"
          variants={fadeInFromTop}
        >
          Turn your thoughts into 
          secure, organized notes.
        </motion.h1>
        <h3 className="text-logoText md:text-2xl text-xl font-semibold text-slate-800 text-center">
          The #1 secure note-taking app.
        </h3>
        <p className="text-slate-700 text-center sm:w-[80%] w-[90%] mx-auto">
          Manage your notes effortlessly and securely. Just type, save, and
          access them from anywhere with robust encryption and seamless
          synchronization. 
        </p>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInFromBotom}
          className="flex items-center justify-center gap-3 py-10 "
        >
          {token ? (
            <>
              <Link to="/create-note">
                <Buttons className="sm:w-52 w-44 bg-customRed font-semibold hover:scale-105 transition-all duration-200 cursor-pointer text-white px-10 py-3 rounded-sm">
                  Create Note
                </Buttons>
              </Link>
              <Link to="/notes">
                <Buttons className="sm:w-52 w-44 bg-btnColor font-semibold hover:scale-105 transition-all duration-200 cursor-pointer text-white px-10 py-3 rounded-sm">
                  My Notes
                </Buttons>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Buttons className="sm:w-52 w-44 bg-customRed font-semibold hover:scale-105 transition-all duration-200 cursor-pointer text-white px-10 py-3 rounded-sm">
                  SignIn
                </Buttons>
              </Link>
              <Link to="/signup">
                <Buttons className="sm:w-52 w-44 bg-btnColor font-semibold hover:scale-105 transition-all duration-200 cursor-pointer text-white px-10 py-3 rounded-sm">
                  SignUp
                </Buttons>
              </Link>
            </>
          )}
        </motion.div>
        .
        <div className="sm:pt-14 pt-0 xl:px-16 md:px-10">
          <h1 className="font-montserrat uppercase text-headerColor  xl:text-headerText md:text-4xl text-2xl  mx-auto text-center font-bold  w-full">
            More Reasons Company Around the world workable
          </h1>
          <Brands />
          <State />
          <div className="pb-10">
            <h1
              className="font-montserrat uppercase text-headerColor pb-16  xl:text-headerText md:text-4xl text-2xl  mx-auto text-center font-bold sm:w-[95%] w-full"
              variants={fadeInFromBotom}
            >
              Testimonial
            </h1>
            <Testimonial />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
