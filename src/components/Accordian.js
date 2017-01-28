import React, { Component } from 'react';

function Caret(props) {
    const toggle = props.toggle;
    if (toggle) return (
        <a onClick={props.onClick} className="pull-right" data-toggle="collapse" data-parent="#settings" href="#settingsContent" aria-expanded="true" aria-controls="settingsContent">
            <span>
                <i className="fa fa-angle-right"></i>
            </span>
        </a>
    )
    if (!toggle) return (
        <a onClick={props.onClick} className="pull-right" data-toggle="collapse" data-parent="#settings" href="#settingsContent" aria-expanded="true" aria-controls="settingsContent">
            <span>
                <i className="fa fa-angle-down"></i>
            </span>
        </a>
    )
}

class Accordian extends Component {
    constructor(props){
        super(props);
        this.state = {toggle: false};
    }

    handleClick= ()=> {
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    };

    render(){
    const toggle = this.state.toggle;
    const handleClick = this.handleClick;
        return(
            <div id="settings" role="tablist" aria-multiselectable="true">
                <div className="card">
                    <div className="card-header" role="tab" id="headingOne">
                        <h6 className="mb-0">
                            Settings
                            <Caret onClick={handleClick} toggle={toggle}/>
                        </h6>
                    </div>

                    <div id="settingsContent" className="collapse in" role="tabpanel" aria-labelledby="headingOne">
                        <div className="card-block">
                            {this.props.content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Accordian;
