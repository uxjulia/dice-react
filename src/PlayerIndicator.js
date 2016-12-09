import React, { Component } from 'react';

class PlayerIndicator extends Component {
  constructor(props) {
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

  render() {
    var totalPlayers = [];
    var uid = 0;
    const nextStyle = {color: "red" };
    const boxStyle = {minHeight: "70px"};
    const nextUp = this.props.nextUp;
    const onClick = this.props.onClick;
    const playerName = this.state.hover;
    const handleHover = this.handleHover;
    const handleLeave = this.handleLeave;

    this.props.players.forEach(function(players){
      uid++;
      if (players.name === nextUp){
        totalPlayers.push(<button key={uid} onClick={onClick} onMouseOver={handleHover} onMouseLeave={handleLeave} id={players.key} title={players.name} className="nextPlayer btn btn-link btn-sm"><i style={nextStyle} title={players.name} className="fa fa-user" aria-hidden="true"/></button>);
      } else {
        totalPlayers.push(<button key={uid} onClick={onClick} onMouseOver={handleHover} onMouseLeave={handleLeave} id={players.key} title={players.name} className="btn btn-link btn-sm"><i className="fa fa-user" title={players.name} aria-hidden="true"/></button>);
      }
    });

    return (
      <div style={boxStyle}>
        <span>Next Up: {nextUp}</span><br/>
        {totalPlayers}<br/>
        <div id="hoverText">{playerName}</div>
      </div>
    )
  }
}

export default PlayerIndicator;