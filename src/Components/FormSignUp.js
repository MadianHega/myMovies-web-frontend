import React, { Component } from 'react';
import '../App.css';
import Label from './Label.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const signUp = [
  {title: 'Prénom :', type: 'text', name: 'userName', autoComplete: 'username', errorMessage: "Le prénom doit contenir entre 2 et 20 caractères"},
  {title: 'Email :', type: 'email', name: 'email', autoComplete: 'email', errorMessage: ""},
  {title: 'Password :', type: 'password', name: 'password', autoComplete: 'new-password', errorMessage: "Le password doit contenir entre 4 et 15 caractères"},
]

class FormSignUp  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      password: "",
      emailExist: false,
      emailError: false,
      userNameError: false,
      passwordError: false,
      signUpValidate: false,
      signUpError: false,
    };
   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    fetch('http://127.0.0.1:3000/signup', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: 'userName=' + this.state.userName + '&email=' + this.state.email + '&password=' + this.state.password
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.emailValid === false) {
          this.setState({
            emailError: true,
            userNameError: false,
            emailExist: false,
            passwordError: false,
            signUpError: false,
          });
        } else if(data.userNameValid === false) {
            this.setState({
              emailError: false,
              userNameError: true,
              emailExist: false,
              passwordError: false,
              signUpError: false,
            });
          } else if(data.isExist === true) {
             this.setState({
               emailError: false,
               emailExist: true,
               userNameError: false,
               passwordError: false,
               signUpError: false,
             });
           } else if(data.passwordValid === false) {
               this.setState({
                 emailError: false,
                 passwordError: true,
                 userNameError: false,
                 emailExist: false,
                 signUpError: false,
               });
            } else if(data.signup === true) {
                this.setState({
                  signUpValidate: true
                });
            } else {
                this.setState({
                  emailError: false,
                  signUpError: true,
                  emailExist: false,
                  userNameError: false,
                  passwordError: false,
                });
           }
      })
      .catch((error) => {
        console.log('request failed :', error)
        this.setState({signUpError: true});
      })
      event.preventDefault()
  }


  render() {

    let labelList = signUp.map((item, index) => {
      // synchronise le state error associé
      let typeError;
      if(item.name === 'userName') {
        typeError = this.state.userNameError
      } else if(item.name === 'email') {
        if(this.state.emailExist) {
          item.errorMessage = "Email déjà utilisé"
          typeError = this.state.emailExist
        } else {
          item.errorMessage = "Email incorrect"
          typeError = this.state.emailError
        }
      } else if(item.name === 'password') {
        typeError = this.state.passwordError
      }
      return <Label
        key={index}
        title={item.title}
        type={item.type}
        name={item.name}
        autoComplete={item.autoComplete}
        error={typeError}
        errorMessage={item.errorMessage}
        handleChange={this.handleChange}
        />
    })
    return (
      <div>
        {
          this.state.signUpValidate
            ? (
              <div className="full-height flex flex-column">
                <span className="font-black">Inscription validée</span>
                <FontAwesomeIcon className="" icon={faCheckCircle} />
              </div>
            )
            : (
              <form onSubmit={this.handleSubmit}>
                {labelList}
                <input type="submit" value="Se connecter" className="full-width" />
              </form>
            )
        }
      </div>
    )
   }
}

export default FormSignUp;
