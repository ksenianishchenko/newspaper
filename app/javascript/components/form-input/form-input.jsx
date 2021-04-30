import React from "react";

const FormInput = ({id, name, placeholder, handleChange, className, ...otherProps}) => {
  return <input className={className} id={id} name={name} placeholder={placeholder} onChange={handleChange} {...otherProps}/>;
}

export default FormInput;
