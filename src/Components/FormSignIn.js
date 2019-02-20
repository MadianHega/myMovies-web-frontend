import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../App.css';
import Label from './Label';

// Data des Inputs signIn
const signIn = [
  {title: "Email :", type: "email", name: "email", autoComplete: "email"},
  {title: "Password :", type: "password", name: "password", autoComplete: "current-password"}
]

class FormSignIn  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      accountError: false,
      fetchError: false
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
    fetch("http://127.0.0.1:3000/signin", {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body:"email=" + this.state.email + "&password=" + this.state.password
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.users.length === 0){
          this.setState({accountError: true});
        }
        else{
          
          this.props.DataUser(data.users[0])
          this.props.CloseModal()
        }
      })
      .catch((error) => {
        this.setState({fetchError: true});
        console.log("request failed :", error)
      })
    event.preventDefault();
  }


  render() {

    let labelList = signIn.map((item, index) => {
      return <Label
        key={index}
        title={item.title}
        type={item.type}
        name={item.name}
        autoComplete={item.autoComplete}
        error={false}
        errorMessage={""}
        handleChange={this.handleChange}
        />
    })
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="Flex-column Justify-content-center Align-items-center">
          <p>{this.state.fetchError && (
            <span className='font-red'>Problème de connexion !</span>
          )}</p>
          <p>{this.state.accountError && (
            <span className='font-red'>email ou password invalide !</span>
          )}</p>
          {labelList}
          <input type="submit" value="Se connecter" className="full-width" />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { PropsModalIsOpen: state }
}

function mapDispatchToProps(dispatch) {
  return {
    CloseModal: function() {
        dispatch( {type: 'CloseModal'} )
    },
    DataUser: function(user){
      dispatch( {type: 'UserData', DataUser: user} )
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormSignIn);
