/* @flow */
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

type Props = {
  onSubmit: (string) => void,
  classes: Object
}

type State = {
  hash: string
}

class NewOffer extends Component<Props, State> {
  constructor (props) {
    super(props)

    this.state = {
      hash: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange = (e) => {
    this.setState({
      hash: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state.hash)
  }

  render () {
    let { classes } = this.props

    return (
      <form className={classes.container} noValidate autoComplete='off' onSubmit={this.onSubmit}>
        <TextField
          id='title'
          label='Title'
          className={classes.textField}
          defaultValue='Rome2Rio'
          onChange={this.onChange}
          margin='normal'
        />
        <TextField
          id='owner'
          label='Owner'
          className={classes.textField}
          defaultValue='0xsomehash'
          onChange={this.onChange}
          margin='normal'
        />
        <TextField
          id='price'
          label='Price'
          className={classes.textField}
          defaultValue='0.1 ETH'
          onChange={this.onChange}
          margin='normal'
        />
        <Button type='submit' label='submit' color='primary' variant='raised'>Submit</Button>
      </form>
    )
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

export default withStyles(styles)(NewOffer)
