/* @flow */
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

type Props = {
  classes: Object
}

type State = {
  web3: Object | null,
  offersCount: number,
  inst: Object | null,
  accounts: Array<Object>
}

@observer
class App extends Component<Props, State> {
  constructor (props) {
    super(props)

    this.state = {
      web3: null,
      offersCount: 0,
      inst: null,
      accounts: []
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
    const web3 = this.state.web3
    if (!web3) {
      throw new Error('web3 not defined')
    }

    const Wheels = contract(WheelsContract)
    Wheels.setProvider(web3.currentProvider)

    let accounts = await web3.eth.getAccounts()
    let inst = await Wheels.deployed()
    let l = await inst.getOffersCount.call()

    this.setState({
      accounts,
      inst,
      offersCount: l.toString()
    })
  }

  onSubmit = async (value) => {
    if (this.state.inst) {
      await this.state.inst.newOffer(value, { from: this.state.accounts[0] })
    }
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
