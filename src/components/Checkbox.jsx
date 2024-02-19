import React, { useState } from "react";

const Checkbox = ({ index, count, title, checked, onChange }) => {


  return (
    <>
      <label className="container">
      <input
        type="checkbox"
        id={`${index}`}
        name=""
        value=""
        checked={checked}
        onChange={onChange} // Use onChange prop
      />
        <span className="checkmark"></span>
      </label>
      <p className={checked ? "item-title checked" : "item-title"}>{title}</p>
    </>
  );
};

export default Checkbox;
