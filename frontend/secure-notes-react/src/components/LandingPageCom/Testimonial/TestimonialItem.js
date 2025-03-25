import React from "react";
import Avatar from "@mui/material/Avatar";
import { motion } from "framer-motion";

const TestimonialItem = ({ title, text, name, status, imgurl }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-testimonialCard    flex flex-col p-6 shadow-md shadow-slate-500 rounded-md"
    >
      <h1 className="text-slate-900 font-montserrat text-2xl font-bold pb-6 ">
        {title}
      </h1>

      <p className="text-xm text-slate-600">{text}</p>

      <div className="pt-5 flex gap-2 items-center">
        <Avatar alt={name} src={imgurl} />
        <div className="flex flex-col  ">
          <span className="font-semibold">{name}</span>
          <span className="-mt-1">{status}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialItem;
