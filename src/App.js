import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './index.css';
var update = require('immutability-helper');
var _ = require('lodash');
import ChartController from './components/ChartController.js';
import Header from './components/Header.js';
import DiceInput from './components/DiceInput.js';
import Settings from './components/Settings.js';
import Footer from './components/Footer.js';
import PlayerData from './controllers/PlayerData';

function Layout ( props ) {
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
            rolls: [ 2, 4, 2, 8, 8, 6, 7, 4, 5, 3, 9],
            lastRoll: "", //TODO: remove this and use last number in log
            log: [],
            nextUp: "",
        };
    }

    setPlayerNames = ( e ) => {
        const data = this.state.players;
        const x = Number (e.target.id) - 1;
        data[ x ] = { key: x, name: e.target.value };
        this.setState ({ players: data });
    };

    // combine this method with setting next player state
    setNextPlayerName = ( e ) => {
        this.setState ({ nextUp: e.target.title });
    };

    handleClick = ( e ) => {
        e.preventDefault();
        // TODO: Set next player (combine with setNextPlayerName)
        const index = Number(e.target.id) - 2;
        const rolls = this.state.rolls;
        rolls[index]++;
        let log = update(this.state.log, {$unshift: [e.target.id]});
        this.setState({rolls: rolls, lastRoll: index, log: log});
    };

    handleUndo = () => {
        const log = this.state.log;
        const lr = _.head(log) - 2;
        const rolls = this.state.rolls;
        if (rolls[lr] !== 0) {
            rolls[lr]--;
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
        const lastRoll = this.state.lastRoll;
        const players = this.state.players;
        const handleUndo = this.handleUndo;
        const log = this.state.log;
        const setNextPlayerName = this.setNextPlayerName;
        return (
            <Layout
                left={<ChartController key={this.chartID} lastRoll={lastRoll} data={data}/>}
                right={
                    <div>
                        <div>
                            <div className="form-group">
                                <PlayerData players={players} onClick={setNextPlayerName}/>
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
