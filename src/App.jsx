import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './index.css';
import update from 'immutability-helper';
import _ from 'lodash';
import ChartController from './controllers/ChartController.jsx';
import Header from './components/Header.jsx';
import DiceInput from './components/DiceInput.jsx';
import Settings from './components/Settings.jsx';
import Footer from './components/Footer.jsx';
import PlayerData from './controllers/PlayerData.jsx';
import faUser from '@fortawesome/fontawesome'
fontawesome.library.add(faUser) // Using new FontAwesome API

function nextPlayer ( activePlayer, option ) {
    let x = null;
    switch (option) {
        case "next":
            x = activePlayer + 1;
            break;
        case "back":
            x = activePlayer - 1;
            break;
        default:
            x = activePlayer + 1;
    }
    return x;
}
function SiteLayout ( props ) {
    return (
        <div>
            <Header title="Dice Roll Counter"/>
            <div className="container-fluid">
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
        </div>
    )
}
function resetPlayers ( oldTotal, newTotal, playerArr ) {
    const diff = oldTotal - newTotal;
    if (newTotal < oldTotal) {
        playerArr.splice (newTotal, diff);
    }
    if (newTotal > oldTotal) {
        let x = playerArr.length;
        while (x < newTotal) {
            x++;
            playerArr.push ("Player " + x);
        }
    }
    if (newTotal === oldTotal) {
        let x = 0;
        while (x < newTotal) {
            playerArr[ x ] = "Player " + (x + 1);
            console.log (playerArr);
            x++;
        }
    }
    return playerArr;
}
class App extends Component {
    constructor ( props ) {
        super (props);
        this.state = {
            players     : [],
            rolls       : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
            log         : [],
            activePlayer: 0,
        };
    }
    
    setPlayerNames = ( e ) => {
        const data = this.state.players;
        const x = Number (e.target.id);
        data[ x ] = e.target.value;
        this.setState ({ players: data });
    };
    setActivePlayer = ( e, option ) => {
        if (e) {
            this.setState ({ activePlayer: Number (e.target.id) });
        } else {
            const activePlayer = this.state.activePlayer;
            const totalPlayers = this.state.players.length;
            const next = nextPlayer (activePlayer, option);
            if (next === totalPlayers) {
                this.setState ({ activePlayer: 0 })
            } else if (next === -1) {
                this.setState ({ activePlayer: totalPlayers - 1 })
            }
            else {
                this.setState ({ activePlayer: next })
            }
        }
    };
    handleClick = ( e ) => {
        e.preventDefault ();
        const index = Number (e.target.id) - 2;
        const rolls = this.state.rolls;
        rolls[ index ]++;
        let log = update (this.state.log, { $unshift: [ e.target.id ] });
        this.setState ({ rolls: rolls, log: log });
        this.setActivePlayer (null, "next");
    };
    handleUndo = () => {
        const log = this.state.log;
        const lastRoll = _.head (log) - 2;
        const rolls = this.state.rolls;
        this.setActivePlayer (null, "back");
        if (rolls[ lastRoll ] !== 0) {
            rolls[ lastRoll ]--;
        }
        log.shift ();
        this.setState ({ rolls: rolls, log: log });
    };
    handleReset = () => {
        this.chartID++;
        this.setState ({ rolls: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], log: [], activePlayer: 0 });
    };
    clearPlayerNames = () => {
        const total = this.state.players.length;
        const players = this.state.players;
        const newPlayerArr = resetPlayers (total, total, players);
        const newPlayers = update (players, { $set: newPlayerArr });
        this.setState ({ players: newPlayers });
    };
    handleSelect = ( e ) => {
        const oldTotal = this.state.players.length;
        let newTotal = e.target.value === "Clear" ? oldTotal : Number (e.target.value);
        const players = this.state.players;
        const newPlayerArr = resetPlayers (oldTotal, newTotal, players);
        const newPlayers = update (players, { $set: newPlayerArr });
        this.setState ({ players: newPlayers });
    };
    
    componentWillMount () {
        this.chartID = 1;
    }
    
    render () {
        const log = this.state.log;
        const lastRoll = _.head (log);
        const diceProps = {
            undo   : this.handleUndo,
            onReset: this.handleReset,
            onClick: this.handleClick,
            log    : log
        };
        const chartProps = {
            key     : this.chartID,
            lastRoll: lastRoll,
            rolls    : this.state.rolls
        };
        const playerProps = {
            players     : this.state.players,
            activePlayer: this.state.activePlayer,
            onClick     : this.setActivePlayer
        };
        const selectProps = {
            handleSelect: this.handleSelect,
            onChange    : this.setPlayerNames,
            handleReset : this.clearPlayerNames
        };
        return (
            <SiteLayout
                left={ <ChartController {...chartProps} /> }
                right={
                    <div>
                        <PlayerData {...playerProps} />
                        <DiceInput {...diceProps} />
                        <Settings {...selectProps} />
                    </div>   
                }
                footer={ <Footer/> }/>
        );
    }
}
export default App;
