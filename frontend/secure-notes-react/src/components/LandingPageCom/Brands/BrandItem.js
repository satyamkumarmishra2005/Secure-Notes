import React from "react";
import { motion } from "framer-motion";

const BrandItem = ({ text, icon: Icon, title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="shadow-sm shadow-btnColor flex flex-col pt-7 pb-10 px-4 items-center gap-3 justify-center"
    >
      <Icon className="text-slate-700 text-6xl" />
      <h3 className="text-xl text-slate-700 font-bold">{title}</h3>
      <p className="text-slate-600 text-center">{text}</p>
    </motion.div>
  );
};

export default BrandItem;
