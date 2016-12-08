import React, { Component } from 'react';
import PlayerIndicator from './PlayerIndicator.js';

class LoggedRolls extends Component {
  render(){
    return(
      <div id="loggedRolls">{this.props.data}</div>
    )
  }
}

class DiceInput extends Component {
  render(){
    return(
      <div className="card mx-auto" id="numberInputs">
        <div className="mx-auto" id="buttonContainer">
          <div className="digit-box">
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="0" id="2">2</button>
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="1" id="3">3</button>
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="2" id="4">4</button>
          </div>
          <div className="digit-box">
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="3" id="5">5</button>
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="4" id="6">6</button>
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="5" id="7">7</button>
          </div>
          <div className="digit-box">
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="6" id="8">8</button>
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="7" id="9">9</button>
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="8" id="10">10</button>
          </div>
          <div className="digit-box">
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="9" id="11">11</button>
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="10" id="12">12</button>
              <button onClick={this.props.onUndo} className="btn btn-sm digit reset" type="button" key="undo" id="undo">Undo</button>
          </div>
          <div className="form-group center-block reset">
              <button onClick={this.props.onReset} className="btn btn-default reset" type="button" key="reset" id="reset">Reset roll data</button>
          </div>
        </div>
      </div>
    );
  }
}


class InfoPanel extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {data: []};
  }

  componentDidMount(){
    const initialData = [];
    this.setState({data: initialData})
  }



  handleClick(e){
    const n = Number(e.target.id);
    var newRolls = this.updateLog(n);
    this.setState({data: newRolls});
  }

  getPlayer() {
    const players = this.props.players;
    const currentPlayer = this.props.nextUp;
    var nx = players.find(function(players) {
        return players.name === currentPlayer;
    });
    return nx; 
  }

  setNext() {
    const players = this.props.players;
    const nextPlayer = this.getPlayer();
    var x = (nextPlayer.key) + 1;
    if (x > players.length) x = 1
    var nextPerson = players.find(function(players){   
      return players.key === x;
    });
    const nextName = nextPerson.name;
    this.setState({nextUp: nextName})
  }

  updateLog(n) {
    const data = this.state.data;
    var x = n + ", ";
    data.push(x);
    return data;
  }


  render() {
    const players = this.props.players;
    const nextUp = this.props.nextUp;
    const onUndo = this.props.onUndo;
    const onReset = this.props.onReset;
    const setPlayer = this.props.setPlayer;
    const data = this.state.data;
    return(
      <div>
        <div className="card card-block">
          <div className="form-group">
            <LoggedRolls data={data}/>
          </div>
        </div>
          <div className="form-group">
            <DiceInput onClick={this.handleClick} onReset={onReset} onUndo={onUndo}/>
          </div>
       <div className="card card-block">
        <PlayerIndicator onClick={setPlayer} players={players} nextUp={nextUp}/>
       </div>
      </div>
    )
  }
}

export default InfoPanel;