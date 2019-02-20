import React, { Component } from 'react';
import '../App.css';



class SpanBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSpan: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {

          }

  render() {

    return (
      <span className=""></span>
    );
  }
}

export default SpanBtn;
