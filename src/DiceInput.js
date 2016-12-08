import React, { Component } from 'react';

class LoggedRolls extends Component {
  render(){
    return(
      <div className="card card-block" id="loggedRolls">
        {this.props.data}
      </div>
    )
  }
}

class DiceInput extends Component {
  constructor(props){
    super(props);
    this.state = {rolls:[]};
  }

  updateLog = (n) => {
    const data = this.state.rolls;
    var x = n + ", ";
    data.push(x);
    return data;
  }

  handleClick = (e) => {
    const n = e.target.id;
    const dataToLog = this.updateLog(n);
    this.props.onClick();
    this.setState({rolls: dataToLog });
  }

  undo = () => {
    const data = this.state.rolls;
    data.pop();
    this.setState({rolls: data});
  }

  reset = () => {
    this.setState({rolls: []});
  }

  render(){
    const handleClick = this.handleClick;
    const rolls = this.state.rolls;
    return(
      <div>
      <LoggedRolls data={rolls}/>
      <div className="card mx-auto" id="numberInputs">
        <div className="mx-auto" id="buttonContainer">
          <div className="digit-box">
              <button onClick={handleClick} className="btn btn-default digit" type="button" key="2" id="2">2</button>
              <button onClick={handleClick} className="btn btn-default digit" type="button" key="3" id="3">3</button>
              <button onClick={handleClick} className="btn btn-default digit" type="button" key="4" id="4">4</button>
          </div>
          <div className="digit-box">
              <button onClick={handleClick} className="btn btn-default digit" type="button" key="5" id="5">5</button>
              <button onClick={handleClick} className="btn btn-default digit" type="button" key="6" id="6">6</button>
              <button onClick={handleClick} className="btn btn-default digit" type="button" key="7" id="7">7</button>
          </div>
          <div className="digit-box">
              <button onClick={handleClick} className="btn btn-default digit" type="button" key="8" id="8">8</button>
              <button onClick={handleClick} className="btn btn-default digit" type="button" key="9" id="9">9</button>
              <button onClick={handleClick} className="btn btn-default digit" type="button" key="10" id="10">10</button>
          </div>
          <div className="digit-box">
              <button onClick={handleClick} className="btn btn-default digit" type="button" key="11" id="11">11</button>
              <button onClick={handleClick} className="btn btn-default digit" type="button" key="12" id="12">12</button>
              <button onClick={this.undo} className="btn btn-sm digit reset" type="button" key="undo" id="undo">Undo</button>
          </div>
          <div className="form-group center-block reset">
              <button onClick={this.reset} className="btn btn-default reset" type="button" key="reset" id="reset">Reset roll data</button>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default DiceInput;