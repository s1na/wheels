import React from 'react'

export default function Offer (props) {
  let { hash, owner } = props

  return (
    <ul>
      <li>{hash}</li>
      <li>{owner}</li>
    </ul>
  )
}
