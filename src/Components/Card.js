import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons'


class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
      error: false,
    };
  }

  handleClick = (id) => {
    if(this.props.userLogin === null) {
      this.props.OpenModal()
    } else {
      if(this.state.like === false) {
        fetch('http://127.0.0.1:3000/like', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: 'userId=' + this.props.userLogin.id + '&movieId=' + id
          })
          .then((response) => response.json())
          .then((data) => {
            if(data.likeSucces === true) {
              this.setState({like: !this.state.like})
            } else {
              this.setState({error: true});
            }
          })
          .catch((error) => {
            console.log('request failed :', error)
            this.setState({error: true});
          })
      } else if(this.state.like === true) {
          fetch('http://127.0.0.1:3000/dislike', {
              method: 'PUT',
              headers: {'Content-Type':'application/x-www-form-urlencoded'},
              body: 'userId=' + this.props.userLogin.id + '&movieId=' + id
            })
            .then((response) => response.json())
            .then((data) => {
              if(data.dislikeSucces === true) {
                this.setState({like: !this.state.like})
              } else {
                this.setState({error: true});
              }
            })
            .catch((error) => {
              console.log('request failed :', error)
              this.setState({error: true});
            })
       }
     }
  }

  render() {
    if(this.state.error) {
      alert("Problème de connexion avec le serveur...")
    }

    let classHeart = ["heart"]
    if (this.state.like) {
      classHeart.push("like")
    }
    return (
      <div id="card"className="col-6 col-lg-3">
        <img src={this.props.img} className="img full-width" alt="affiche du film" />
        <div className="card-body">
          <h5 className="card-title">
            <FontAwesomeIcon icon={faHeart} className={classHeart.join(" ")} onClick={() => this.handleClick(this.props.id)}/>
            {this.props.title}
          </h5>
          <div className="card-text">
            <p>{this.props.overview}</p>
          </div>
        </div>
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

function mapStateToProps(state) {
  return {userLogin: state.UserDataReducer}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Card);
