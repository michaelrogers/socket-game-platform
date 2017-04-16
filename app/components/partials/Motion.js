import React from 'react'
import { deviceMotion } from 'react-device-events'

class Motion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      acceleration: {
        x: 0,
        y: 0
      }
    }
  }
  componentDidMount() {
    data = {
      x: gravityX,
      y: gravityY
    }
    console.log("++++++motion mount data++++++")
    console.log(data)
    // this.setState({
    //   acceleration: {
    //     x: gravityX,
    //     y: gravityY
    //   }
    // });

    // this.props.childData(data)
  }
  render() {
    const { supported, acceleration, accelerationIncludingGravity, rotationRate, interval } = this.props.deviceMotion
    // const [accelerationX, accelerationY, accelerationZ] = acceleration || []
    const [gravityX, gravityY, gravityZ] = accelerationIncludingGravity || []
    // const [alpha, beta, gamma] = rotationRate || []

    return (
      <ul>
        <li><strong>AccelerationX:</strong> {gravityX} </li>
        <li> AccelerationY: {gravityY}</li>
      </ul>
    )
  }
}

export default deviceMotion(Motion)
