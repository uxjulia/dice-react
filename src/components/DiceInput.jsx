import React, { Component } from 'react';
let _ = require('lodash');
import LoggedRolls from './LoggedRolls';

class DiceInput extends Component {

  render(){
    const handleClick = this.props.onClick;
    const log = this.props.log;
    return(
      <div>
      <LoggedRolls data={log}/>
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
              <button onClick={this.props.undo} className="btn btn-sm digit reset" type="button" key="undo" id="undo">Undo</button>
          </div>
          <div className="form-group center-block reset">
              <button onClick={this.props.onReset} className="btn reset" type="button" key="reset" id="reset">Start New Game</button>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default DiceInput;
