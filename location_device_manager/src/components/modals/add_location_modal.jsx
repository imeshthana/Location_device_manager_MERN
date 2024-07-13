import React from 'react';
import './modals.css';

const AddDeviceModal = ({ isOpen, onClose, setLocation, onSubmit }) => {
  if (!isOpen) return null;

  function handleChange(event) {
    const {name,value} = event.target;
    setLocation(prevReview => {
      return{...prevReview, [name]: value};
    });
  }
  
  return (
    <div className="add-container">
                <div className="overlay"></div>
                <form className='add-location-form'>
                    <button className='add-close' onClick={onClose}>
                        <i id="user" className="fas fa-close"></i>
                    </button>
                    <h1 className="sub-title">Add Location</h1>
                    <div  className="inputs">
                        <input  className="add-input" 
                        name="locationName" onChange={handleChange} placeholder="Location Name" autoComplete='off' ></input>
                        <input  className="add-input" 
                        name="address" onChange={handleChange} placeholder="Location Address" autoComplete='off'></input>
                        <input  className="add-input" 
                        name="contact" onChange={handleChange} placeholder="Location Contact Number" autoComplete='off'></input>
                    </div>
                    <button onClick={onSubmit} type="submit" class="add-btn">Add Location</button>
                </form>
            </div>
  );
};

export default AddDeviceModal;
