import React, { Component } from 'react';
let _ = require('lodash');

function Player(name, id){
    this.id = id;
    this.name = name;
}

function players(arr){
    if (arr){
        let i = [];
        _.each(arr, function(name, index){
            i.push(new Player(name, index));
        });
        return i;
    } else {
        return console.log("No players");
    }
}

function ActiveIcon(props){
    const style = {color: "#C53437"};
    return(
        <i id={props.player.id} style={style} className="fa fa-user" aria-hidden="true"/>
     )
}

function InactiveIcon(props){
    return(<i id={props.player.id} className="fa fa-user" aria-hidden="true"/>)
}

function PlayerIcon(props) {
    const style = {
        cursor: "pointer",
        margin: "4px"
    };
    const handleClick = (e) => {
        console.log(e.target.id);
        props.onClick(e);
    };
    return(
        <span id={props.player.id} style={style} title={props.player.name} onClick={handleClick}>
            {props.active && <ActiveIcon {...props}/>}
            {!props.active && <InactiveIcon {...props}/>}
        </span>
    )
}

class PlayerData extends Component {
    constructor(props){
        super(props);
        this.state = {players: {}, uiRender: []};
    }

    makePlayer = (arr) => {
        const obj = players(arr);
        this.setState({players: obj});
    };

    makeIcons = (arr) => {
        const playerI = [];
        const handleClick = this.props.onClick;
        _.each(arr, (i) => {
            if (i.id === this.props.activePlayer){
                playerI.push(<PlayerIcon active key={i.id} player={i} onClick={handleClick}/>);
            } else {
                playerI.push(<PlayerIcon key={i.id} player={i} onClick={handleClick}/>);
            }
        });
        return playerI;
    };
    
    componentWillMount(){
        this.makePlayer(this.props.players);
    };

    componentWillReceiveProps(nextProps){
        if (nextProps !== this.props) this.makePlayer(this.props.players);
    };

    render(){
        const players = this.makeIcons(this.state.players);
        const activePlayer = this.props.activePlayer;
        const nextPlayerName = this.props.players[activePlayer];
        return(
            <div key={activePlayer} className="form-group">
                {players.length !== 0 && <div><div>{players}</div>
                    <p>Next Player: {nextPlayerName}</p></div>}
            </div>
         )
    }
}

export default PlayerData;
