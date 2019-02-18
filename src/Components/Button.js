import React from 'react';
import '../App.css';

const  Button = ({ content, handle }) => (
  <button onClick={() => handle()}>{content}</button>
)

export default Button;
