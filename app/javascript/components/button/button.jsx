import React from "react";

const Button = ({type, className, onClick, children, otherProps}) => {
  return <button className={!className ? `btn btn-primary btn-block waves-effect waves-light` : className} type={type} onClick={onClick}>{children}</button>
}

export default Button;
