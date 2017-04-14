import React from 'react';
import p5 from 'p5';
// import p5Play from 'p5.play'

export default class P5Wrapper extends React.Component {

  componentDidMount() {
    // try {
      document.querySelector('#canvas').classList.remove("hidden");
    // } catch(e) { console.log(e) }
    // this.canvas = new p5(this.props.sketch, this.wrapper);

    // if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
    //   this.canvas.myCustomRedrawAccordingToNewPropsHandler(this.props);
    // }
  }

  // componentWillReceiveProps(newprops) {
  //   if(this.props.sketch !== newprops.sketch){
  //     this.wrapper.removeChild(this.wrapper.childNodes[0]);
  //     this.canvas = new p5(newprops.sketch, this.wrapper);
  //   }
  //   if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
  //     this.canvas.myCustomRedrawAccordingToNewPropsHandler(newprops);
  //   }
  // }

  render() {
    return (
      <div>
        <div id="" ref={wrapper => this.wrapper = wrapper}></div>
         <script src="/lib/p5.play.js"></script>
         
      
      </div>
      );
  }
}