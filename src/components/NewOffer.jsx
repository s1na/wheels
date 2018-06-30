import React, { Component } from 'react'

export default class NewOffer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      hash: null
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange (e) {
    this.setState({
      hash: e.target.value
    })
  }

  onSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.state.hash)
  }

  render () {
    return (
      <form onSubmit={this.onSubmit}>
        <input type='text' defaultValue='Hash' onChange={this.onChange} />
        <input type='submit' value='submit' />
      </form>
    )
  }
}
