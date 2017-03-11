import React, { Component, PropTypes } from 'react';
import Accordian from './Accordian.jsx';
class Input extends Component {
    render () {
        let x = 0;
        let inputs = [];
        while (x < this.props.players) {
            inputs.push (
                <div key={x} className="form-group">
                    <input className="form-control"
                           defaultValue={"Player " + (x + 1)}
                           id={x} onChange={this.props.onChange}
                    />
                </div>);
            x++;
        }
        return (
            <div className="form-group">
                {inputs}
            </div>
        )
    }
}
function Select ( props ) {
    const onChange = props.onChange;
    const value = props.value;
    return (
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
function Button ( props ) {
    const style = {
        marginRight: "2px"
    };
    return (
        <button style={style} type={props.type} className={props.className} onClick={props.onClick} id={props.id}
                title={props.title} value={props.value}>
            {props.children}
        </button>
    )
}
class Settings extends Component {
    constructor ( props ) {
        super (props);
        this.state = { totalPlayers: 0 };
    }
    
    handleSelect = ( e ) => {
        const value = e.target.value === "Clear" ? this.state.totalPlayers : e.target.value;
        this.setState ({ totalPlayers: value });
        this.props.handleSelect(e);
    };
    
    render () {
        const totalPlayers = this.state.totalPlayers;
        const onChange = this.props.onChange;
        const handleSelect = this.handleSelect;
        const handleReset = this.handleSelect;
        return (
            <div>
                <Accordian content={
                    <div>
                        <Select onChange={handleSelect}/>
                        <form>
                            <Input players={totalPlayers} onChange={onChange} />
                            <Button onClick={handleReset} type="reset" className="btn" value="Clear">
                                Clear Names
                            </Button>
                        </form>
                      </div>
                }/>
            </div>
        )
    }
}
export default Settings;
Select.propTypes = {
    onChange: PropTypes.func,
    value   : PropTypes.string
};
Button.propTypes = {
    type     : PropTypes.string,
    className: PropTypes.string,
    onClick  : PropTypes.func,
    id       : PropTypes.string,
    title    : PropTypes.string,
    children : PropTypes.node.isRequired
};
Button.defaultProps = {
    type     : "button",
    className: "btn btn-default",
    id       : null,
    title    : null,
};