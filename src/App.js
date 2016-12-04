import React, { Component } from 'react';
import $ from 'jquery';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import '../font-awesome-4.7.0/css/font-awesome.css';

$();

var PLAYERS = [
{name: "Stella"},
{name: "Jenie"},
{name: "Julia"},
{name: "Mocha"},
{name: "Bailey"}
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
  render(){
    const players = this.props.players;
    
    return(
      <div>
        <div className="card card-block">
          <div className="form-group">
            <NextPlayer players={players}/> 
          </div>
        </div>
        <div className="card card-block">
          <div className="form-group">
            <LoggedRolls/>
          </div>
        </div>
          <div className="form-group">
            <DiceInput/>
          </div>
      </div>
    )
  }
}

class PlayerIcon extends Component {
  nextStyle = {color: "red" };

  render(){
    const isNext = this.props.isNext;
    if (isNext === "true") {
      return(
        <i style={this.nextStyle} className="fa fa-user" aria-hidden="true"></i>
      )
    }
    return (
      <i className="fa fa-user" aria-hidden="true"></i>
    )
  }
}

class NextPlayer extends Component {
  constructor(props){
    super(props);
    this.state = {nextUp: "Jenie"};
  }
  render(){
    var totalPlayers = [];
    var nextPlayer = null;
    var uid = 1;
    const nextUp = this.state.nextUp;
    
    this.props.players.forEach(function(players){
      if (players.name === nextUp){
        totalPlayers.push(<PlayerIcon key={uid++} name={players.name} isNext="true" />);
      } else {
        totalPlayers.push(<PlayerIcon key={uid++} name={players.name}/>);
      }
      
    });
    return(
        <div>
          {totalPlayers}
        </div>
      )
  }
}

class DiceInput extends Component {
  render(){
    return(
      <div className="card mx-auto" id="numberInputs">
        <div className="mx-auto" id="buttonContainer">
          <div className="digit-box">
              <button className="btn btn-default digit" type="button" id="0">2</button>
              <button className="btn btn-default digit" type="button" id="1">3</button>
              <button className="btn btn-default digit" type="button" id="2">4</button>
          </div>
          <div className="digit-box">
              <button className="btn btn-default digit" type="button" id="3">5</button>
              <button className="btn btn-default digit" type="button" id="4">6</button>
              <button className="btn btn-default digit" type="button" id="5">7</button>
          </div>
          <div className="digit-box">
              <button className="btn btn-default digit" type="button" id="6">8</button>
              <button className="btn btn-default digit" type="button" id="7">9</button>
              <button className="btn btn-default digit" type="button" id="8">10</button>
          </div>
          <div className="digit-box">
              <button className="btn btn-default digit" type="button" id="9">11</button>
              <button className="btn btn-default digit" type="button" id="10">12</button>
              <button className="btn btn-sm digit reset" type="button" id="undo">Undo</button>
          </div>
          <div className="form-group center-block reset">
              <button className="btn btn-default reset" type="button" id="reset">Reset roll data</button>
          </div>
        </div>
      </div>
    );
  }
}

class LoggedRolls extends Component {
  constructor(props){
    super(props);
    this.state = { data: [] };
  }
  render(){
    return(
      <div id="loggedRolls">1, 2, 3</div>
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
