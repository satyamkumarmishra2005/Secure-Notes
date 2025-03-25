import React from "react";

const Buttons = ({ disabled, children, className, onClickhandler, type }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${className}`}
      onClick={onClickhandler}
    >
      {children}
    </button>
  );
};

export default Buttons;
