(function (exports){

 function setPlayer() {
    this.setState({nextUp: e.target.title});
  }

  function handleClick(e) {
    var x = this.updateData(e.target.id);
    this.setNext();
    this.setState({rolls: x});
  }

  function handleUndo() {
    const data = this.state.rolls;
    data.pop();
    this.setState({rolls: data});
  }

  function handleReset() {
    this.setState({rolls: []});
  }

  exports.setPlayer = function() {
  	return setPlayer();
  }

  exports.handleClick = function(){
  	return handleClick();
  }

  exports.handleUndo = function(){
  	return handleUndo();
  }

  exports.handleReset = function(){
  	return handleReset();
  }
	
})(this.events = {});