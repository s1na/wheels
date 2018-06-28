import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import contract from 'truffle-contract'

import WheelsContract from '../build/contracts/Wheels.json'
import { getWeb3 } from './utils'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      web3: null,
      offersCount: null,
      inst: null,
      accounts: null,
      hash: ''
    }
  }

  async componentWillMount() {
    let results = await getWeb3

    this.setState({
      web3: results.web3
    })

    this.instantiateContract()
  }

  async instantiateContract() {
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

  async onSubmit(e) {
    e.preventDefault()
    let tx = await this.state.inst.newOffer(this.state.hash, { from: this.state.accounts[0] })
  }

  onChange(e) {
    this.setState({
      hash: e.target.value
    })
  }

  render() {
    let p = (<p>Connecting</p>)
    if (this.state.offersCount !== null) {
      p = (<p>{ this.state.offersCount } Offers</p>)
    }

    return (
      <div>
        <h2>Wheels</h2>
        { p }
        <form onSubmit={(e) => this.onSubmit(e)}>
          <input type="text" defaultValue="Hash" onChange={(e) => this.onChange(e)} />
          <input type="submit" value="submit" />
        </form>
      </div>
    )
  }
}

export default hot(module)(App)
