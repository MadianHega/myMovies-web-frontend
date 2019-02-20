import React, { Component } from 'react';
import '../App.css';



class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSpan: false,
    };
  }

  componentWillMount(){
   if(this.props.isSpan === true){
     this.setState({isSpan: true})
   }
  }

  render() {

    return (
      <div>
        {
          this.state.isSpan
            ?(<span className="">{this.props.text}</span>)
            :(<button className="" onClick={() => this.props.handleClick()}>{this.props.text}</button>)
        }
      </div>

    );
  }
}

export default Button;
