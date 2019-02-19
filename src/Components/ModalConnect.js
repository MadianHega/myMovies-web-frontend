import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import {connect} from 'react-redux';
import FormSignUp from './FormSignUp'

class ModalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: false,
    };
  }

  // Tab à False affiche SignIn / Tab à True affiche SignUp
  handleTab = (boolean) => {
    this.setState({tab: boolean})
  }


  render() {

    // Configure les props à envoyer aux Inputs signIn
    let signIn = [
      {content: "Email :", type: "email", name: "signInEmail", autoComplete: "email"},
      {content: "Password :", type: "password", name: "signInPassword", autoComplete: "current-password"}
    ]
    // Configure les props à envoyer aux Inputs signUp
    let signUp = [
      {content: "Prénom :", type: "text", name: "signUpName", autoComplete: "username"},
      {content: "Email :", type: "email", name: "signUpEmail", autoComplete: "email"},
      {content: "Password :", type: "password", name: "signUpPassword", autoComplete: "new-password"},
    ]


    return (
        <MDBContainer>
          <MDBModal isOpen={this.props.isOpen} centered>
            <MDBModalHeader toggle={this.props.CloseModal}>
              {
                this.state.tab
                ?(<span>Rejoins MyMovies aujourd'hui</span>)
                :(<span>Se connecter à MyMovies</span>)
              }
            </MDBModalHeader>
            <MDBModalBody>
              <div>
                <span onClick={() => this.handleTab(false)}>Se connecter</span>
                <span onClick={() => this.handleTab(true)}>S'inscrire</span>
              </div>
              <div>
                <div>
                  {
                    this.state.tab
                    ? (<FormSignUp />)
                    : (<div></div>)
                  }
                </div>
              </div>
            </MDBModalBody>
          </MDBModal>
        </MDBContainer>
      );
    }
  }

function mapDispatchToProps(dispatch) {
  return {
    CloseModal: function() {
        dispatch( {type: 'CloseModal'})
    }
  }
}

function mapStateToProps(state) {
  return {isOpen: state.ModalReducer}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalPage);
