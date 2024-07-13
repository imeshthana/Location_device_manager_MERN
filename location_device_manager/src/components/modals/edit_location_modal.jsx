import React from 'react';
import './modals.css';

const EditLocationModal = ({ isOpen, onClose, location, onUpdate , onSubmit}) => {
  if (!isOpen) return null;

  function handleChange(event) {
    const { name, value } = event.target;
    onUpdate(prevLocation => ({ ...prevLocation, [name]: value }));
  }

  return (
    <div className="add-container">
      <div className="overlay"></div>
      <form onSubmit={onSubmit} className='edit-location-form'>
        <button className='add-close' onClick={onClose}>
          <i className="fas fa-close"></i>
        </button>
        <h1 className="sub-title">Edit Location</h1>
        <div className="inputs">
          <div className='input-field'>
            <div className='input-name'><p>Name</p></div>
            <input className="add-input" name="locationName" autoComplete='off' onChange={handleChange} value={location.locationName}></input>
          </div>
          <div className='input-field'>
            <div className='input-name'><p>Address</p></div>
            <input className="add-input" onChange={handleChange} value={location.address} name="address" placeholder="Location Address" autoComplete='off'></input>
          </div>
          <div className='input-field'>
            <div className='input-name'><p>Contact</p></div>
            <input className="add-input" name="contact" onChange={handleChange} value={location.contact} placeholder="Location Contact Number" autoComplete='off'></input>
          </div>
        </div>
        <button type="submit" class="add-btn">Update Location</button>
      </form>
    </div>
  );
};

export default EditLocationModal;
