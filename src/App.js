import React, { Component } from 'react';
import $ from 'jquery';
import '../node_modules/tether/dist/js/tether.js';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import '../font-awesome-4.7.0/css/font-awesome.css';

$();

var PLAYERS = [
{key: 1, name: "Stella"},
{key: 2, name: "Jenie"},
{key: 3, name: "Julia"},
{key: 4, name: "Mocha"},
{key: 5, name: "Bailey"}
];

function Layout(props) {
  return(
    <div className="container">
      <Header title="Dice Roll Counter"/>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-8">
            {props.left}
          </div>
          <div className="col-md-4">
            {props.right}
          </div>
        </div>
      </div>
    </div>
  )
}

class Header extends Component{
  render(){
    return(
      <header className="site-header">
          <div className="site-icon">
              <div className="dice-box">
                  <div className="dice rotate_right">
                      <div className="pip-container clearfix">
                          <div className="pip float-xs-right" id="1"></div>
                      </div>
                      <div className="pip-container">
                          <div className="pip mx-auto" id="2"></div>
                      </div>
                      <div className="pip-container">
                          <div className="pip float-xs-left" id="3"></div>
                      </div>
                  </div>
              </div>
          </div>
        <div className="wrapper">
          <p className="site-title">{this.props.title}</p>
        </div>
      </header>
    )
  }
}

class InfoPanel extends Component {
  constructor(props){
    super(props);
    this.setPlayer = this.setPlayer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.state = {nextUp: "Jenie", data: []};
  }

  setPlayer(e) {
    this.setState({nextUp: e.target.title});
  }

  getPlayer() {
    const players = this.props.players;
    const currentPlayer = this.state.nextUp;
    var nx = players.find(function(players) {
        return players.name === currentPlayer;
    });
    return nx; 
  }

  setNext(){
    const players = this.props.players;
    const nextPlayer = this.getPlayer();
    var x = (nextPlayer.key) + 1;
    if (x > players.length) x = 1
    var nextPerson = players.find(function(players){   
      return players.key === x;
    }); // test
    const nextName = nextPerson.name;
    this.setState({nextUp: nextName})
  }

  updateData(x){
    const data = this.state.data;
    var n = x + ", ";
    data.push(n);
    return data;
  }

  handleClick(e) {
    var x = this.updateData(e.target.id);
    this.setNext();
    this.setState({data: x});
  }

  handleReset() {
    this.setState({data: []});
  }

  handleUndo() {
    const data = this.state.data;
    data.pop();
    this.setState({data: data});
  }

  render(){
    const players = this.props.players;
    const nextUp = this.state.nextUp;
    const data = this.state.data;
    return(
      <div>
        <div className="card card-block pb-0">
          <div className="form-group">
            <NextPlayer onClick={this.setPlayer} nextUp={nextUp} players={players}/>
          </div>
        </div>
        <div className="card card-block">
          <div className="form-group">
            <LoggedRolls data={data}/>
          </div>
        </div>
          <div className="form-group">
            <DiceInput onClick={this.handleClick} onReset={this.handleReset} onUndo={this.handleUndo}/>
          </div>
        <div className="card card-block">
          <div className="form-group">
            <Settings/>
          </div>
        </div>
      </div>
    )
  }
}

class NextPlayer extends Component {
  constructor(props){
    super(props);
    this.handleHover = this.handleHover.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.state = {hover: ""};
  }

  handleHover(e) {
    var x = e.target.title;
    this.setState({hover: x});
  }
  handleLeave(e) {
    this.setState({hover: ""});
  }

  render(){
    var totalPlayers = [];
    var uid = 1;
    const nextStyle = {color: "red" };
    const boxStyle = {minHeight: "70px"};
    const nextUp = this.props.nextUp;
    const playerName = this.state.hover;
    const handleClick = this.props.onClick;
    const handleHover = this.handleHover;
    const handleLeave = this.handleLeave;

    this.props.players.forEach(function(players){
      uid++;
      if (players.name === nextUp){
        totalPlayers.push(<button key={uid} onMouseOver={handleHover} onMouseLeave={handleLeave} onClick={handleClick} id={players.key} title={players.name} className="nextPlayer btn btn-link btn-sm"><i style={nextStyle} key={uid} id={players.key} title={players.name} className="fa fa-user" aria-hidden="true"/></button>);
      } else {
        totalPlayers.push(<button key={uid} onMouseOver={handleHover} onMouseLeave={handleLeave} onClick={handleClick} id={players.key} title={players.name} className="btn btn-link btn-sm"><i key={uid} className="fa fa-user" id={players.key} title={players.name} aria-hidden="true"/></button>);
      }
    });
    return(
        <div style={boxStyle}>
          <span>Next Up: {nextUp}</span><br/>
          {totalPlayers}<br/>
          <div id="hoverText">{playerName}</div>
        </div>

      )
  }
}

class DiceInput extends Component {
  render(){
    // const handleClick = this.props.handleClick;
    // const handleReset = this.props.handleReset;
    return(
      <div className="card mx-auto" id="numberInputs">
        <div className="mx-auto" id="buttonContainer">
          <div className="digit-box">
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="2" id="2">2</button>
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="3" id="3">3</button>
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="4" id="4">4</button>
          </div>
          <div className="digit-box">
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="5" id="5">5</button>
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="6" id="6">6</button>
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="7" id="7">7</button>
          </div>
          <div className="digit-box">
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="8" id="8">8</button>
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="9" id="9">9</button>
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="10" id="10">10</button>
          </div>
          <div className="digit-box">
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="11" id="11">11</button>
              <button onClick={this.props.onClick} className="btn btn-default digit" type="button" key="12" id="12">12</button>
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

class LoggedRolls extends Component {
  render(){
    return(
      <div id="loggedRolls">{this.props.data}</div>
    )
  }
}

class PlayerNameInputs extends Component {
  constructor(props){
    super(props);
    this.state = {value:""};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    e.preventDefault();
    this.setState({value: e.target.value});
  }

  render(){
    const value = this.state.value;
    return(
      <input onChange={this.handleChange} className="form-control" value={value}/>
    )
  }
}

class Settings extends Component {
  render(){
    return(
      <div className="card">
        <PlayerNameInputs/>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <Layout right={<InfoPanel players={PLAYERS}/>}/>
    );
  }
}

export default App;
