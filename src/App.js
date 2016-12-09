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
      players: [{key: 0, name: ""}], 
      rolls: [2,4,2,8,8,6,7,4,5,3,9,4],
      nextUp: "",
    };
  }

  updateLog = (n) => {
    const data = this.state.rolls;
    var x = n + ", ";
    data.push(x);
    return data;
  }

  setPlayerNames = (e) => {
    const data = this.state.players;
    const x = Number(e.target.id) - 1;
    data[x] = {key: x, name: e.target.value};
    this.setState({players: data});
  }

  setNextPlayerName = (e) => {
    this.setState({nextUp: e.target.title});
  }

  handleClick = () => {
    if (this.state.players.length > 0) {
      this.setNext();
    }
  }

  handleUndo = () => {
    const data = this.state.rolls;
    data.pop();
    this.setState({rolls: data});
  }

  handleReset = () => {
    this.setState({rolls: []});
  }

  getPlayer = () => {
    const players = this.state.players;
    const currentPlayer = this.state.nextUp;
    var nx = players.find(function(players) {
        return players.name === currentPlayer;
    });
    return nx; 
  }

  setNext = () => {
    const players = this.state.players;
    const thisPlayer = this.getPlayer();
    var x = (thisPlayer.key) + 1;
    if (players.length === 1 || x == players.length || x === undefined) x = 0;
    var nextPerson = players.find(function(players){   
      return players.key === x;
    });
    const nextName = nextPerson.name;
    this.setState({nextUp: nextName})
  }

  saveSettings = () => {
    const firstPlayer = this.state.players[0].name;
    this.setState({nextUp: firstPlayer});
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
              <PlayerIndicator onClick={this.setNextPlayerName} players={players} nextUp={nextUp}/>
            </div>
            <DiceInput onClick={this.handleClick}/>
            <div className="card card-block">
              <Settings onChange={this.setPlayerNames} onClick={this.saveSettings} />
            </div>
            </div>
        </div>
      }/>
    );
  }
}

export default App;
