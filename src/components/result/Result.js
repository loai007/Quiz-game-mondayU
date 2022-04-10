import React, { Component } from "react"
import "./Result.css"



class Result extends Component {
  // Constructor 
  constructor(props) {
    super(props);

    this.state = {
        score:this.props.score
        
    };
}

// ComponentDidMount is used to
// execute the code 
componentDidMount() {
        
}

handelQuizRestart() {

    window.location.reload(false);
    
}
render() {
    const {score} = this.state
    const qArr = this.props.qArr
    let msg = ""
    if(score === 0)
        msg = "Better Next Time"
    if(score >0 && score < 5)
        msg = "Not Bad!"
    if(score >=5 && score <10)
        msg = "All Most There!!"
    if(score === 10)
        msg = "Prefect Score!!"
    
    
    return (
        
            <>
            <div>{msg}</div>
            <div className='score-section'>You scored {score} out of {qArr.length}</div>
            <button onClick={this.handelQuizRestart}> Restart Quiz</button>
            
            </>
        
);
}
}

export default Result
