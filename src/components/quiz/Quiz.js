import React, { Component } from "react";
import "./Quiz.css";
import axios from "axios";
import Result from "./../result/Result";
import Timer from "../timer/Timer";

class LambdaDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, msg: null };
  }

  handleClick = (api) => (e) => {
    e.preventDefault();

    this.setState({ loading: true });
    fetch("/.netlify/functions/" + api)
      .then((response) => response.json())
      .then((json) => this.setState({ loading: false, msg: json.msg }));
  };

  render() {
    const { loading, msg } = this.state;

    return (
      <p>
        <button onClick={this.handleClick("hello")}>
          {loading ? "Loading..." : "Call Lambda"}
        </button>
        <button onClick={this.handleClick("async-dadjoke")}>
          {loading ? "Loading..." : "Call Async Lambda"}
        </button>
        <br />
        <span>{msg}</span>
      </p>
    );
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////

class Quiz extends Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      count: 0,
      score: 0,
      isFinish: false,
      minutes: 0,
      seconds: 60,
      counter: 0,
    };
  }
  pull_data = (childData) => {
    this.setState({ count: childData });
  };
  // ComponentDidMount is used to
  // execute the code
  componentDidMount() {
    axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
      const items = res.data;
      this.setState({ items });
    });
    this.setState({ score: 0 });
    this.setState({ count: 0 });
    this.setState({ isFinish: false });
  }

  handleCorrectAnswerClick = () => {
    let { score } = this.state;
    score += 1;
    this.setState({ score: score });
  };

  handleAnswerClick = (ans) => {
    const { items } = this.state;
    let { count } = this.state;
    let { seconds } = this.state;
    let { minutes } = this.state;
    // this.setState({minutes:count})
    if (items.results[count].correct_answer === ans) {
      this.handleCorrectAnswerClick();
    }
    this.increaseCounter();
  };

  increaseCounter = () => {
    let { count } = this.state;
    const { items } = this.state;
    const { isFinish } = this.state;

    if (count < items.results.length - 1) {
      count += 1;
      this.setState({ count: count });
    } else this.setState({ isFinish: true });
  };

  shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  getAnswers = (data) => {
    let arr = [];
    const { count } = this.state;
    let { seconds } = this.state;
    let { minutes } = this.state;
    let { counter } = this.state;
    for (let i = 0; i < data["incorrect_answers"].length; i++) {
      arr.push(data["incorrect_answers"][i]);
    }
    arr.push(data["correct_answer"]);

    return this.shuffle(arr);
  };

  render() {
    // tell data is loaded
    const { items } = this.state;
    const { count } = this.state;
    let { score } = this.state;
    let { isFinish } = this.state;
    const { seconds } = this.state;
    let sec = 60;

    if (items.length === 0)
      return (
        <div>
          <div className="app">
            <h1> Starting Quiz ... </h1>{" "}
          </div>
        </div>
      );

    const qArr = items.results;

    let answers = this.getAnswers(items["results"][count]);

    return (
      <div className="app">
        {isFinish ? (
          <Result score={score} qArr={qArr} />
        ) : (
          <>
            <div className="question-section">
              <Timer func={this.pull_data} count={count} />

              <div className="question-count">
                <span>Question {count + 1}</span>/{qArr.length}
              </div>
              <div className="question-text">{qArr[count].question}</div>
            </div>
            <div className="answer-section">
              {answers.map((answer) => (
                <button
                  key={answer}
                  onClick={() => {
                    this.handleAnswerClick(answer);
                  }}
                >
                  {" "}
                  {answer}{" "}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Quiz;
