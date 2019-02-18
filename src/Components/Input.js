import React from 'react';
import '../App.css';

const  Input = ({ content, type, name, autoComplete, handleChange }) => (
  <label>
    <div className="color-black Font-bold">{content}</div>
    <input className="" type={type} name={name} autoComplete={autoComplete} onChange={handleChange}/>
  </label>
)

export default Input;
