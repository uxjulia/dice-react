import React, { Component, PropTypes } from 'react';
import Accordian from './Accordian.js';

function Input({ players, onChange }){
  // const n = players;
  // const onChange = onChange;
  let x = 0;
  let inputs = [];
  while (x < players) {
     x++;
    inputs.push(
      <div key={x} className="form-group">
        <input className="form-control" placeholder={"Player " + x + "'s Name"} id={x} onChange={onChange}/>
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
      <label htmlFor="total-players" className="control-label">Total Players</label>
      <select id="total-players" onChange={onChange} value={value} className="form-control input-sm">
        <option value="0">- Select -</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
    </div>
  )
}

Select.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
};

function Button(props){
  const style = {
    marginRight: "2px"
  };
  return (
      <button style={style} type={props.type} className={props.className} onClick={props.onClick} id={props.id} title={props.title}>
          {props.children}
      </button>
    )
}

Button.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    id: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.node.isRequired
};

Button.defaultProps = {
    type: "button",
    className: "btn btn-default",
    id: null,
    title: null,
};

class Settings extends Component {
  constructor(props){
    super(props);
    this.state = {num: 0};
  }

  handleClick = (e) => {
    this.setState({num: e.target.value});
    this.props.onChange(e);
  };

  onReset = () => {
    this.setState({num:0 });
  };

  render() {
    const players = this.state.num;
    return(
      <div>
        <Accordian content={
          <form>
            <Select onChange={this.handleClick}/>
            <Input players={players} onChange={this.props.onChange} />
            <Button onReset={this.onReset} type="reset" className="btn">
                Clear
            </Button>
              <Button onClick={this.props.onClick} className="btn btn-primary">
                  Save
              </Button>
          </form>
        } />
       </div>
    )
  }
}

export default Settings;