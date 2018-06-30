import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import contract from 'truffle-contract'
import { observer } from 'mobx-react'

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
    let p = (<p>Connecting</p>)
    if (this.state.offersCount !== null) {
      p = (<p>{ this.state.offersCount } Offers</p>)
    }

    return (
      <div>
        <h2>Wheels</h2>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/offers'>Offers</Link></li>
          <li><Link to='/new-offer'>New Offer</Link></li>
        </ul>
        { p }

        <Route exact path='/' component={Home} />
        <Route path='/offers' component={OfferList} />
        <Route path='/new-offer' render={() => <NewOffer onSubmit={this.onSubmit} />} />
      </div>
    )
  }
}

export default hot(module)(withRouter(App))
