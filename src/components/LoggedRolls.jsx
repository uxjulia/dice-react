import React, {Component} from 'react';
let _ = require('lodash');

class LoggedRolls extends Component {
    render(){
    const data = this.props.data;
    const tail = _.tail(data);
    const first = _.head(data);
    const style = {
        total: {
            fontSize: ".8rem"
        }
    };
        return(
            <div className="card card-block" id="loggedRolls">
                <div className="form-group">
                    <span className="text-muted" style={style.total}>Total Rolls: {data.length} </span>
                </div>
                <div>
                    <span>Last Roll: </span>{!data.length && <span className="text-muted">No rolls yet</span>}
                    {data.length <= 1 && <span>{_.join(data, ', ')}</span>}
                    {data.length > 1 && <span className="rolllog"><span>{first}, </span><span>{_.join(tail, ', ')}</span></span>}
              </div>
        </div>
      )
  }
}

export default LoggedRolls;