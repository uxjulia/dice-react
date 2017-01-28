import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './index.css';
import update from 'immutability-helper';
import ChartController from './components/ChartController.js';
import Header from './components/Header.js';
import PlayerIcons from './components/PlayerIcons.js';
import DiceInput from './components/DiceInput.js';
import Settings from './components/Settings.js';
import Footer from './components/Footer.js';

function Player ( id, name ) {
    this.id = id;
    this.name = name;
}

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
            players: [ { key: 0, name: "" } ],
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
    
    setNextPlayerName = ( e ) => {
        this.setState ({ nextUp: e.target.title });
    };
    
    handleClick = ( e ) => {
        if (this.state.players.length > 0) {
            this.setNext ();
        }
        const index = Number(e.target.id) - 2;
        const rolls = this.state.rolls;
        rolls[index] = rolls[index] + 1;
        let log = update(this.state.log, {$push: [e.target.id]});
        this.setState({rolls: rolls, lastRoll: index, log: log});
    };
    
    handleDefaultPlayers = ( e ) => {
        const players = this.state.players;
        const val = e.target.value;
        let x = 0;
        while (x < val) {
            const n = x + 1;
            players[ x ] = { key: x, name: "Player " + n };
            this.setState ({ players: players[ x ] });
            x++;
        }
        const firstPlayer = this.state.players[ 0 ].name;
        this.setState ({ nextUp: firstPlayer });
    };
    
    handleUndo = () => {
        const rolls = this.state.rolls;
        const index = this.state.lastRoll;
        const log = this.state.log;
        log.pop();
        rolls[index] = rolls[index] - 1;
        this.setState({rolls: rolls, log: log});
    };
    
    handleReset = () => {
        this.chartID++;
        this.setState ({ rolls: [0,0,0,0,0,0,0,0,0,0,0], log: [] });
    };
    
    getPlayer = () => {
        const players = this.state.players;
        const currentPlayer = this.state.nextUp;
        return players.find (function ( players ) {
            return players.name === currentPlayer;
        });
    };
    
    setNext = () => {
        const players = this.state.players;
        const thisPlayer = this.getPlayer ();
        let x = (thisPlayer.key) + 1;
        if (players.length === 1 || x === players.length || x === undefined) x = 0;
        let nextPerson = players.find (function ( players ) {
            return players.key === x;
        });
        const nextName = nextPerson.name;
        this.setState ({ nextUp: nextName })
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
        const nextUp = this.state.nextUp;
        const lastRoll = this.state.lastRoll;
        const handleUndo = this.handleUndo;
        const log = this.state.log;
        return (
            <Layout
                left={<ChartController key={this.chartID} lastRoll={lastRoll} data={data}/>}
                right={
                    <div>
                        <div>
                            <div className="form-group">
                                <PlayerIcons key={players.length} onClick={this.setNextPlayerName} players={players} nextUp={nextUp}/>
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