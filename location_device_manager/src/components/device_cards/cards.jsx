import React from 'react'
import Card from './card'
import './card.css'

const Cards = (props) => {
  return (
    <div className='cards'>
      {props.devices.map((device, index) => (
        <Card key={index} device={device} />
      ))}
    </div>
  )
}

export default Cards
