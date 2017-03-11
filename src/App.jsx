import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './index.css';
import update from 'immutability-helper';
let _ = require('lodash');
import ChartController from './components/ChartController.jsx';
import Header from './components/Header.jsx';
import DiceInput from './components/DiceInput.jsx';
import Settings from './components/Settings.jsx';
import Footer from './components/Footer.jsx';
import PlayerData from './controllers/PlayerData.jsx';

function SiteLayout( props ) {
    return (
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
                    {props.footer}
                </div>
            </div>
        </div>
    )
}

class App extends Component {
    constructor ( props ) {
        super (props);
        this.state = {
            players: ["Julia","Jenie","Stella"],
            rolls: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            log: [],
            activePlayer: "0",
        };
    }

    setPlayerNames = ( e ) => {
        const data = this.state.players;
        const x = Number(e.target.id) - 1;
        data[ x ] = { key: x, name: e.target.value };
        this.setState ({ players: data });
    };

    // TODO: Combine setNextPlayerName method with setting next player state
    setNextPlayerName = ( e ) => {
        this.setState ({ activePlayer: e.target.id });
    };

    handleClick = ( e ) => {
        e.preventDefault();
        // TODO: Set next player (combine with setNextPlayerName)
        const index = Number(e.target.id) - 2;
        const rolls = this.state.rolls;
        rolls[index]++;
        let log = update(this.state.log, {$unshift: [e.target.id]});
        this.setState({rolls: rolls, log: log});
    };

    handleUndo = () => {
        const log = this.state.log;
        const lastRoll = _.head(log) - 2;
        const rolls = this.state.rolls;
        if (rolls[lastRoll] !== 0) {
            rolls[lastRoll]--;
        }
        log.shift();
        this.setState({rolls: rolls, log: log});
    };

    handleReset = () => {
        this.chartID++;
        this.setState ({ rolls: [0,0,0,0,0,0,0,0,0,0,0], log: [] });
    };

    saveSettings = ( e ) => {
        const firstPlayer = this.state.players[ 0 ].name;
        this.setState ({ nextUp: firstPlayer });
        e.preventDefault ();
    };

    componentWillMount(){
        this.chartID = 1;
    }

    render () {
        const data = this.state.rolls;
        const players = this.state.players;
        const log = this.state.log;
        const lastRoll = _.head(log);
        const handleUndo = this.handleUndo;
        const activePlayer = this.state.activePlayer;
        const playerData = {
            players: players,
            activePlayer: activePlayer,
            onClick: this.setNextPlayerName
        };
        return (
            <SiteLayout
                left={<ChartController key={this.chartID} lastRoll={lastRoll} data={data}/>}
                right={
                    <div>
                        <div>
                            <div className="form-group">
                                <PlayerData {...playerData}/>
                            </div>
                            <DiceInput undo={handleUndo} onReset={this.handleReset} onClick={this.handleClick} log={log}/>
                            <Settings onChange={this.setPlayerNames} onClick={this.saveSettings}/>
                        </div>
                    </div>
                }
                footer={<Footer/>}
            />
        );
    }
}

export default App;
