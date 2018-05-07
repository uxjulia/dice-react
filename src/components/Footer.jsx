import React, { Component } from 'react';

class Footer extends Component {
	render() {
		const style = {
			fontSize: ".9rem",
			backgroundColor: "white",
			height: "30px"
		};
		const heartColor = {
			color: "#C53437"
		};
		return(
			<nav style={style} className="navbar-fixed-bottom d-sm-none d-md-block">
				<div className="container">
					<center><span>made with <span style={heartColor}><i className="fa fa-heart" /></span> by uxjulia</span></center>
				</div>
			</nav>
			)
	}
}

export default Footer;
