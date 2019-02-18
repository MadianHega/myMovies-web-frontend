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
      signUpName: "",
      signUpEmail: "",
      signUpPassword: "",
      signInName: "",
      signInEmail:"",
      signInPassword:"",
      emailExist: false,
      nameError: false,
      passwordError: false,
      signUpValidate: false,
      signUpError: false,
    };
  }


  // componentDidMount(event){
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // }

  // Tab à False affiche SignIn / Tab à True affiche SignUp
  handleTab = (boolean) => {
    this.setState({tab: boolean})
  }
  // Ecoute les événements des Inputs et les stocks dans leur état respectif
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  signIn = () => {

  }


  signUp = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });

    var ctx = this;
    fetch("http://127.0.0.1:3000/signup", {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: "pseudo=" + ctx.state.signUpName + "&email=" + ctx.state.signUpEmail + "&password=" + ctx.state.signUpPassword
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

         if(data.pseudoValid === false){
           console.log("pseudo");
            this.setState({
              nameError: true,
              emailExist: false,
              passwordError: false,
              signUpError: false,
            });
          }
           else if(data.isExist === true){
             console.log("isexist");
             this.setState({
               emailExist: true,
               nameError: false,
               passwordError: false,
               signUpError: false,
             });
           }
           else if(data.passwordValid === false){
             console.log("password");
               this.setState({
                 passwordError: true,
                 nameError: false,
                 emailExist: false,
                 signUpError: false,
               });
            }
           else if(data.signup === true){
             console.log("signup");
             this.setState({
               signUpValidate: true
             });
           }
           else{
             console.log("else");
             this.setState({
               signUpError: true,
               emailExist: false,
               nameError: false,
               passwordError: false,
             });
           }
      })
      .catch((error) => console.log("request failed :", error))
      event.preventDefault();
  }

  render() {
    console.log("name",this.state.signUpName);
    console.log("email", this.state.signUpEmail);
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

                <div>
                  {
                    this.state.tab
                    ? (<form className="flex flex-column">{signUpList}</form>)
                    : (<form className="flex flex-column">{signInList}</form>)
                  }
                </div>
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
