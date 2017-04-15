// @flow
import React, { Component } from 'react'

export default class Main extends Component {
  render () {
    const hello = (val: string) => {
      return <div>Hello, {val}!</div>
    }

    return hello('world')
  }
}
