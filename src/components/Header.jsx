import React, { Component } from 'react';

class Header extends Component{
  render(){
    return(
      <header className="site-header">
          <div className="site-icon">
              <div className="dice-box">
                  <div className="dice rotate_right">
                      <div className="pip-container clearfix">
                          <div className="pip float-xs-right" id="1"></div>
                      </div>
                      <div className="pip-container">
                          <div className="pip mx-auto" id="2"></div>
                      </div>
                      <div className="pip-container">
                          <div className="pip float-xs-left" id="3"></div>
                      </div>
                  </div>
              </div>
          </div>
        <div className="wrapper">
          <p className="site-title">{this.props.title}</p>
        </div>
      </header>
    )
  }
}

export default Header;