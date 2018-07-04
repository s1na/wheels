import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import contract from 'truffle-contract'
import { observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'

import NavBar from './components/NavBar'
import Home from './components/Home'
import OfferList from './components/OfferList'
import NewOffer from './components/NewOffer'
import WheelsContract from '../build/contracts/Wheels.json'
import { getWeb3 } from './utils'

@observer
class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      web3: null,
      offersCount: null,
      inst: null,
      accounts: null
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  async componentWillMount () {
    let results = await getWeb3

    this.setState({
      web3: results.web3
    })

    this.instantiateContract()
  }

  async instantiateContract () {
    const Wheels = contract(WheelsContract)
    Wheels.setProvider(this.state.web3.currentProvider)

    let accounts = await this.state.web3.eth.getAccounts()
    let inst = await Wheels.deployed()
    let l = await inst.getOffersCount.call()

    this.setState({
      accounts,
      inst,
      offersCount: l.toString()
    })
  }

  async onSubmit (value) {
    await this.state.inst.newOffer(value, { from: this.state.accounts[0] })
  }

  render () {
    let { classes } = this.props
    let p = (<p>Connecting</p>)
    if (this.state.offersCount !== null) {
      p = (<p>{ this.state.offersCount } Offers</p>)
    }

    return (
      <div className={classes.root}>
        <NavBar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          { p }

          <Route exact path='/' component={Home} />
          <Route path='/offers' component={OfferList} />
          <Route path='/new-offer' render={() => <NewOffer onSubmit={this.onSubmit} />} />
        </main>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
})

export default hot(module)(withRouter(withStyles(styles)(App)))
