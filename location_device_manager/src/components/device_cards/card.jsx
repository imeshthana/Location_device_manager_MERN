import React from 'react'
import './card.css'

const Card = (props) => {
  return (
    <div className='card'>
        {props.device.image && (
          <img src={`http://localhost:3001/src/images/${props.device.image}`} alt="Blog" className="image" />
        )}     
     <div className='content'>
        <h2 className='number'>Number: <span>{props.device.uniqueNumber}</span></h2>
        <h2 className='type'>Type: <span>{props.device.type}</span></h2>
        <h2 className='status'>Status: <span>{props.device.status}</span></h2>
      </div>
    </div>
  )
}

export default Card