import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import {connect} from 'react-redux';
import Input from './Input';
import Button from './Button'

class ModalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: false,
      SignUpName: "",
      SignUpEmail: "",
      SignInName: "",
      SignInEmail:"",
      SignInPassword:""
    };
  }
  // False tab affiche SignIn / True tab affiche SignUp
  handleTab = (boolean) => {
    this.setState({tab: boolean})
  }
  // Ecoute les événements des Inputs et les stocks dans leur état respectif
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  SignIn = () => {

  }

  SignUp = () => {

  }

  render() {
    // Configure les props à envoyer aux Inputs signIn
    let signIn = [
      {content: "Email :", type: "email", name: "SignInEmail", autoComplete: "email"},
      {content: "Password :", type: "password", name: "SignInPassword", autoComplete: "current-password"}
    ]
    // Configure les props à envoyer aux Inputs signUp
    let signUp = [
      {content: "Prénom :", type: "text", name: "SignUpName", autoComplete: "username"},
      {content: "Email :", type: "email", name: "SignUpEmail", autoComplete: "email"},
      {content: "Password :", type: "password", name: "SignUpPassword", autoComplete: "new-password"},
    ]
    let signInList = signIn.map((item, index) => {
      return <Input key={index} content={item.content} type={item.type} name={item.name} autoComplete={item.autoComplete} handleChange={this.handleChange}/>
    })
    let signUpList = signUp.map((item, index) => {
      return <Input key={index} content={item.content} type={item.type} name={item.name} autoComplete={item.autoComplete} handleChange={this.handleChange}/>
    })

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
                {
                  this.state.tab
                  ? (<form>{signUpList}</form>)
                  : (<form>{signInList}</form>)
                }
              </div>
              <div>
                {
                  this.state.tab
                  ?(<Button content={"S'inscrire"} handle={this.signUp}/>)
                  :(<Button content={"Se connecter"} handle={this.signIn}/>)
                }
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
