import React, { Component } from 'react'

import Offer from './Offer'

export default class OfferList extends Component {
  render () {
    const offers = [
      { hash: 'hash1', owner: 'owner1' },
      { hash: 'hash2', owner: 'owner2' }
    ]
    const offerEls = offers.map((o) => (
      <li key={o.hash}><Offer {...o} /></li>
    ))

    return (
      <ul>
        {offerEls}
      </ul>
    )
  }
}
