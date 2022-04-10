import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import axios from 'axios';
import Quiz from "./components/quiz/Quiz";
import QuizGame from './components/quizGame/QuizGame';

class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }

  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state
    

    return (
      <p>
        <button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</button>
        <button onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : "Call Async Lambda"}</button>
        <br />
        <span>{msg}</span>
      </p>
    )
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////

class App extends Component {
  // Constructor 
  constructor(props) {
    super(props);

    this.state = {
        items: [],
        DataisLoaded: false
        
    };
}

render() {

    return (
       <QuizGame/>
);
}
}

export default App
