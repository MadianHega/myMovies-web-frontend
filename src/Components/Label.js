import React, { Component } from 'react';
import '../App.css';


class Label extends Component {

  render() {
    let labelClass = ['full-width','flex flex-column']
    let titleClass = ['font-black', 'font-bold']
    let inputClass = ['full-width']
    console.log(this.props.error);
    return (
      <label className={labelClass.join(' ')}>
        <div className={titleClass.join(' ')}>{this.props.title}</div>
        <input className={inputClass.join(' ')} type={this.props.type} name={this.props.name} onChange={this.props.handleChange}/>
          <p>{this.props.error && (
             <span className='font-red'>{this.props.errorMessage}</span>
          )}</p>
      </label>
    );
  }
}

export default Label;
