import React, { Component } from 'react';
import Graph from './BarGraph.js';
import Header from './Header.js';
import PlayerIndicator from './PlayerIndicator.js';
import DiceInput from './DiceInput.js';
import Settings from './Settings.js';

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

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      players: [{key: 1, name: "Julia"},
{key: 2, name: "Stella"},
{key: 3, name: "Mocha"}], 
      rolls: [2,4,2,8,8,6,7,4,5,3,9,4],
      nextUp: "Stella",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.setPlayer = this.setPlayer.bind(this);
  }

  updateLog(n) {
    const data = this.state.rolls;
    var x = n + ", ";
    data.push(x);
    return data;
  }

  setPlayer(e) {
    this.setState({nextUp: e.target.title});
  }

// TODO: Clean this method up.. 
  handleClick(e) {
    this.setNext();
  }

  handleUndo() {
    const data = this.state.rolls;
    data.pop();
    this.setState({rolls: data});
  }

  handleReset() {
    this.setState({rolls: []});
  }
//TODO: Standardize the way functions are being written
  getPlayer = () => {
    const players = this.state.players;
    const currentPlayer = this.state.nextUp;
    var nx = players.find(function(players) {
        return players.name === currentPlayer;
    });
    return nx; 
  }

  setNext() {
    const players = this.state.players;
    const nextPlayer = this.getPlayer();
    var x = (nextPlayer.key) + 1;
    if (x > players.length) x = 1
    var nextPerson = players.find(function(players){   
      return players.key === x;
    });
    const nextName = nextPerson.name;
    this.setState({nextUp: nextName})
  }

  render() {
    const data = this.state.rolls;
    const players = this.state.players;
    const nextUp = this.state.nextUp;
    return (
      <Layout left={<Graph data={data} height="400" color="RGB(103, 151, 224)"/>} right={
        <div>
          <div>
            <div className="form-group">
              <PlayerIndicator onClick={this.setPlayer} players={players} nextUp={nextUp}/>
            </div>
            <DiceInput onClick={this.handleClick}/>
            <div className="card card-block">
              <Settings />
            </div>
            </div>
        </div>
      }/>
    );
  }
}

export default App;
