import React, { Component } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons'


class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      like: false,
    };
  }

  handleClick = (id) => {
    console.log(id);
    this.setState({like: !this.state.like})
  }

  render() {
    let classHeart = ["heart"]
    if (this.state.like) {
      classHeart.push("like")
    }
    return (
      <div id="card"className="col-6 col-lg-3">
        <img src={this.props.img} className="img" alt="affiche du film" />
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

export default Card;
