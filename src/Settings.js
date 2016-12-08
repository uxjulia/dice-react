import React, { Component } from 'react';

class Settings extends Component {
  constructor(props){
    super(props);
    this.state = {value:""};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    e.preventDefault();
    this.setState({value: e.target.value});
  }

  render(){
    const value = this.state.value;
    return(
      <input onChange={this.handleChange} className="form-control" value={value}/>
    )
  }
}

export default Settings;