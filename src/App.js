import React, { Component } from 'react'
import { Button, message } from 'antd';

export default class App extends Component {

  handleClick = ()=>{
    message.success('This is a message of success')
  }
  
  render() {
    return (
      <div>
        app
        <Button type="primary" onClick={this.handleClick}>Primary Button</Button>
      </div>
      
    )
  }
}

