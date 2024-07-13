import React from 'react'
import ListItem from './list_item'
import './list.css'

const List = (props) => {
  return (
    <div className='list'>
        <ListItem name={props.locationName}
          id={props.id}
        />
    </div>
  )
}

export default List
