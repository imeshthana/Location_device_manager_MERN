import React from 'react';
import './modals.css';

const AddLocationModal = ({ isOpen, image, onClose, newDevice, setNewDevice, setImage, onSubmit }) => {
  if (!isOpen) return null;

  function handleNewDeviceChange(event) {
    const { name, value } = event.target;
    setNewDevice(prevDevice => ({ ...prevDevice, [name]: value }));
  }

  return (
    <div className="add-container">
                <div className="overlay"></div>
                <form className='add-location-form' onSubmit={onSubmit}>
                    <button className='add-close' onClick={onClose}>
                        <i id="user" className="fas fa-close"></i>
                    </button>
                    <h1 className="sub-title">Add Device</h1>
                    <div className='fileInputbox'>
                            <label htmlFor='fileInput'>
                              <div className='addImage-text'>
                                <i className='fas fa-add addImage-icon' />
                                <h4>Add the image</h4>
                                </div>
                            </label>
                        {image && (
                            <img className='input-image' src={URL.createObjectURL(image)} alt='' />
                        )}
                        <input type='file' id='fileInput' style={{ display: 'none' }} onChange={e => setImage(e.target.files[0])} />

                    </div>
                    <div className="inputs">
                        <select onChange={handleNewDeviceChange} name="type" value={newDevice.type} className='box1'>
                    <option className='dropdownOption' value=''>Select Category</option>
                    <option value="Pos">Pos</option>
                    <option value="Kiosk">Kiosk</option>
                    <option value="Signage">Signage</option>
                </select>
                <select onChange={handleNewDeviceChange} name="status" value={newDevice.status} className='box1'>
                    <option className='dropdownOption' value=''>Select Category</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                    </div>
                    <button type="submit" class="add-btn">Add Device</button>
                </form>
            </div>
  );
};

export default AddLocationModal;
