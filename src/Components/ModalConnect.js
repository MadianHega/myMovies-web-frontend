import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import {connect} from 'react-redux';
import FormSignUp from './FormSignUp'
import FormSignIn from './FormSignIn'


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
                    : (<FormSignIn />)
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
