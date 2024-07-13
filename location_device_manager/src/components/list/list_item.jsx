import React from 'react';
import { Link } from 'react-router-dom';
import './list.css';

const ListItem = (props) => {
  return (
    <Link to={`/location/${props.id}`} className="link">
        <div className='listItem'>
            <div className='content'>
                <h1>{props.name}</h1>
            </div>
        </div>
    </Link>
  )
}

export default ListItem;
