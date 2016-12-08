import React, { Component } from 'react';

class Graph extends Component {
  render () {
    const barColor = this.props.color;
    const value = this.props.data;
    const total = Number(this.props.height);
    const style = {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      maxHeight: this.props.height + "px",
      minHeight: this.props.height + "px"
    };
    const bars = [];
    var n = 0;
    while (n < 11) {
      bars.push( <Bar key={n} title={value[n]} number={value[n]} total={total} color={barColor}/> );
      n++
    } 
    
    return (
      <div style={style}>
       {bars}
      </div>
      )
  }
}

function Bar(props){
  const total = props.total;
  const number = props.number ? props.number : 0;
  const barHeight = (total / 100) * (number + 5);
  const color = props.color ? props.color : "RGB(103, 151, 224)";
  const fontSize = props.fontSize ? props.fontSize : ".8rem";
  const fontColor = props.fontColor ? props.fontColor : "white";
  const style = {
    display: "flex",
    flex: "1 1 auto",
    backgroundColor: color,
    height: barHeight,
    width: "100px",
    margin: "2px",
    alignItems: "flex-start",
    alignContent: "center"
  }
  const textStyle = {
    fontSize: fontSize,
    color: fontColor,
    marginLeft: "auto",
    marginRight: "auto",
  }
  return (
    <div style={style} title={props.number} color={props.color}>
      <span style={textStyle}>{number}</span>
    </div>
  )
}

export default Graph;