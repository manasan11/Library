import React from 'react'

const Button = ({ label, onClick, type = "button" }) => {
  return (
    <button onClick={onClick} type={type} className="btn">
      {label}
    </button>
  );
}
export default Button
