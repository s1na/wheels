/* @flow */
import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'

import Offer from './Offer'

type Props = {}

class OfferList extends Component<Props> {
  render () {
    const offers = [
      { title: 'Rome to Rio', owner: 'owner1', price: '0.1 ETH' },
      { title: 'Bonn to Tehran', owner: 'owner2', price: '0.5 ETH' }
    ]
    const offerEls = offers.map((o) => (
      <Grid item xs={3} key={o.title}><Offer {...o} /></Grid>
    ))

    return (
      <Grid container spacing={16}>
        {offerEls}
      </Grid>
    )
  }
}

export default OfferList
