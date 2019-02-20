import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../App.css';
import logo from '../logo.png'
import SpanBtn from './SpanBtn'

class Navbar extends Component {

  openModal = () => {
    this.props.OpenModal()
  }

  render() {
    let loginbtn = "ok"
    return (
      <div id="navbar" className="col-12 flex flex-row">
        <img src={logo} alt="logo du site" />
        <div>MyMovies</div>
        <SpanBtn content={"Liste de film"} handle={this.connection} />
        <SpanBtn content={"Mes films favoris"} handle={this.connection} />
        <button className={" "} handle={this.openModal}>{loginbtn}</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    OpenModal: function() {
        dispatch( {type: 'OpenModal'})
    }
  }
}

export default connect(
    null,
    mapDispatchToProps
)(Navbar);
