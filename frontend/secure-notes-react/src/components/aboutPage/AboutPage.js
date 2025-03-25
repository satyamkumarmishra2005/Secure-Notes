import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
//import aboutImage from "./path/to/your/image.jpg"; // Add your image path here

const AboutPage = () => {
  return (
    <div className=" p-8   bg-gray-100 min-h-screen">
      <div className="md:w-1/2">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="mb-4">
          Welcome to SecureNote, your trusted companion for secure and private
          note-taking. We believe in providing a safe space where your thoughts
          and ideas are protected with the highest level of security. Our
          mission is to ensure that your notes are always accessible to you and
          only you. With state-of-the-art encryption and user-friendly features,
          SecureNote is designed to keep your information confidential and
          secure.
        </p>

        <ul className="list-disc list-inside mb-4 text-sm px-6 py-2">
          <li className="mb-2">
            Add an extra layer of security with two-factor authentication.
          </li>
          <li className="mb-2">
            Your notes are encrypted from the moment you create them
          </li>
          <li className="mb-2">
            Access your notes from anywhere with the assurance that they are
            stored .
          </li>
          <li className="mb-2">
            Our app is designed to be intuitive and easy to use.
          </li>
        </ul>
        <div className="flex space-x-4 mt-10">
          <Link className="text-white rounded-full p-2 bg-customRed  " to="/">
            <FaFacebookF size={24} />
          </Link>
          <Link className="text-white rounded-full p-2 bg-customRed  " to="/">
            <FaTwitter size={24} />
          </Link>
          <Link className="text-white rounded-full p-2 bg-customRed  " to="/">
            <FaLinkedinIn size={24} />
          </Link>
          <Link className="text-white rounded-full p-2 bg-customRed  " to="/">
            <FaInstagram size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
