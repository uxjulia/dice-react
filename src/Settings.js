import React, { Component } from 'react';

class Settings extends Component {
  constructor(props){
    super(props);
    this.state = {num: 0, players: []};
  }

  handleClick = (e) => {
    this.setState({num: e.target.value});
  }

  render() {
    const players = this.state.num;
    return(
      <div>
        <Select onChange={this.handleClick}/>
        <Input players={players} onChange={this.props.onChange} />
        <div className="form-group">
          <Button onClick={this.props.onClick} className="btn btn-primary pull-right" text="Save" />
        </div>
       </div>
    )
  }
}

function Input(props){
  const n = props.players;
  const onChange = props.onChange;
  var x = 0;
  var inputs = [];
  while (x < n) {
     x++;
    inputs.push(
      <div key={x} className="form-group">
        <input key={x} className="form-control" placeholder={"Player " + x + "'s Name"} id={x} onChange={onChange}/>
      </div>);
  }
  return (
    <div className="form-group">
      {inputs}
    </div>
  )
}

function Select(props){
  const onChange = props.onChange;
  const value = props.value;
  return(
    <div className="form-group">
      <select onChange={onChange} value={value} className="form-control input-sm">
        <option value="0">Select # of Players</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
    </div>
  )
}

function Button(props){
  return (
    <button className={props.className} onClick={props.onClick} id={props.id} title={props.title}>{props.text}</button> 
    )
}

export default Settings;