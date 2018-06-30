import React from 'react'

const Offer = (props) => {
  let { hash, owner } = props

  return (
    <ul>
      <li>{hash}</li>
      <li>{owner}</li>
    </ul>
  )
}

export default Offer
