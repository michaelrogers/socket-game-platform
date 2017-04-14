import React from "react";
import p5 from 'p5';
import P5Wrapper from './P5Wrapper';
import sketch from '../sketches/sketch';


export default class Pinata extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sketch: sketch,
        };
    }

//   componentDidMount() {
//     this.canvas = new p5(sketch, this.refs.wrapper)
//   }
//   componentWillReceiveProps(props, newprops) {
//     if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
//       this.canvas.myCustomRedrawAccordingToNewPropsHandler(newprops);
//     }
//   }
  render() {
    return (
        <div>
            <P5Wrapper sketch={this.state.stateSketch} rotation={this.state.rotation}/>
        </div>
    );
  }
}
// <script src="/lib/p5.play.js"></script>
// <script src="/script/batSwing.js"></script>
// <script src="/script/sketch.js"></script>