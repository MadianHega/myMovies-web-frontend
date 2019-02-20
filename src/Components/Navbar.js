import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../App.css';
import logo from '../logo.png'
import Button from './Button'

class Navbar extends Component {

  openModal = () => {
    this.props.OpenModal()
  }

  render() {

    return (
      <div id="navbar" className="col-12 flex flex-row">
        <img src={logo} alt="logo du site" />
        <div>MyMovies</div>
        <Button isSpan={true} text={"Accueil"} />
        <Button isSpan={true} text={"Favoris"} />
        <Button isSpan={false} text={"Connexion"} handleClick={this.openModal}/>
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
