import React from "react";
import p5 from 'p5';
import P5Wrapper from './P5Wrapper';
import sketch from '../lib/p5.play.js';


export default class Pinata extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sketch: sketch,
        };
    }
  render() {
    return (
        <div>
            <P5Wrapper sketch={this.state.stateSketch} rotation={this.state.rotation}/>
        </div>
    );
  }
}