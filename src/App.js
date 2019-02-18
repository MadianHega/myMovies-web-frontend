import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';
import ModalReducer from './Reducers/Modal.reducer';
import Navbar from './Components/Navbar'
import CardMovie from './Components/Card'
import ModalSign from './Components/ModalSign'

const store = createStore(combineReducers({ModalReducer}));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: "chargement...",
      movieList: []
    };
  }

  // Récupère la liste de film à proposer
  componentDidMount(){
      fetch('http://localhost:3000/movieList')
      .then((response) => response.json())
      .then((data) => {
        let newMovieList = [...data.movieList]
        this.setState({movieList: newMovieList, loading: ""})
      }).catch((error) => {
        console.log("request failed :", error)
        this.setState({loading: "erreur lors du chargement..."})

      })
  }

  render() {
    let movieList = this.state.movieList.map((item, index) => {
        return <CardMovie key={index} id={item.id} title={item.title} overview={item.overview} img={item.img} />
      })
    return (
      <Provider store={store} className="App container-fluid">
        <div className="row flex flex-row justify-center">
          <Navbar />
          <ModalSign />
          {movieList}
          {this.state.loading}
        </div>
      </Provider>
    );
  }
}

export default App;
