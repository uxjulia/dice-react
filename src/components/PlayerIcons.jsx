import React, { Component, PropTypes } from 'react';

class PlayerIcons extends Component {
  constructor(props) {
    super(props);
    this.state = {hover: ""}
  }

  handleHover = (e) => {
    let x = e.target.title;
    this.setState({hover: x});
  };

  handleLeave = () => {
    this.setState({hover: ""});
  };

  render() {
    let playerIcons = [];
    const nextStyle = {color: "#C53437"};
    const boxStyle = {minHeight: "70px"};
    const nextUp = this.props.nextUp;
    const onClick = this.props.onClick;
    const playerName = this.state.hover;
    const handleHover = this.handleHover;
    const handleLeave = this.handleLeave;
    const players = this.props.players;

    players.forEach(function(players, index){
      if (players.name === nextUp){
        playerIcons.push(<button key={index + players.name} onClick={onClick} onMouseOver={handleHover} onMouseLeave={handleLeave} title={players.name} className="nextPlayer btn btn-link btn-sm"><i style={nextStyle} title={players.name} className="fa fa-user" aria-hidden="true"/></button>);
      } else {
        playerIcons.push(<button key={index + players.name} onClick={onClick} onMouseOver={handleHover} onMouseLeave={handleLeave} title={players.name} className="btn btn-link btn-sm"><i className="fa fa-user" title={players.name} aria-hidden="true"/></button>);
      }
    });

    return (
      <div style={boxStyle}>
        <span>Next Up: {nextUp}</span><br/>
        {playerIcons}<br/>
        <div id="hoverText">{playerName}</div>
      </div>
    )
  }
}

export default PlayerIcons;

PlayerIcons.propTypes = {
    players: PropTypes.array.isRequired,
    nextUp: PropTypes.string,
    onClick: PropTypes.func
};

PlayerIcons.defaultProps = {
    players: [],
    nextUp: ""
};
