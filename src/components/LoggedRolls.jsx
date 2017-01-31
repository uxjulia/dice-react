import React, {Component} from 'react';
var _ = require('lodash');

class LoggedRolls extends Component {
    render(){
    const data = this.props.data;
    const tail = _.tail(data);
    const first = _.head(data);
      return(
          <div className="card card-block" id="loggedRolls">
                <span>Last Roll: </span>{!data.length && <span className="text-muted">No rolls yet</span>}
                {data.length <= 1 && <span>{_.join(data, ', ')}</span>}
                {data.length > 1 && <span className="rolllog"><span>{first}, </span><span>{_.join(tail, ', ')}</span></span>}
          </div>
      )
  }
}

export default LoggedRolls;