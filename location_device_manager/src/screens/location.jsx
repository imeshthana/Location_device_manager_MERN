
import React,{useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cards from '../components/device_cards/cards';
import ConfirmationModal from '../components/confirmation_model/confirmation_model';
import AddDeviceModal from '../components/modals/add_device_modal';
import EditLocationModal from '../components/modals/edit_location_modal';

const Location = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [modal1, setModal1] = useState(false);
  const [location, setLocation] = useState({
    locationName:'',
    address:'',
    contact:'',
    devices:[]
  })
  const [updatedLocation, setUpdatedLocation] = useState({});
  const [newDevice, setNewDevice] = useState({
    uniqueNumber: '',
    type: '',
    status: '',
    image:''
  }); 
  const [image, setImage] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const toggleModal1 = () => {
    setUpdatedLocation({
        locationName: location.locationName,
        address: location.address,
        contact: location.contact
      });
      setModal1(!modal1);
  };

  const [modal2, setModal2] = useState(false);

  const toggleModal2 = () => {
      setNewDevice(
      {
        uniqueNumber: newDevice.uniqueNumber,
        type: newDevice.type,
        status: newDevice.status,
        image: newDevice.image
      }
      )
      setModal2(!modal2);
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/api/locations/${id}`)
      .then(response => {
        setLocation(response.data);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, [id]);

  function deleteLocation(id) {
      axios.delete(`http://localhost:3001/api/locations/${id}`)
        .then(response => {
          alert("Location deleted successfully!")
          navigate('/');
        })
        .catch(error => {
          console.error('Error deleting location:', error);
        });
  }

  function editLocation(event) {
    axios.put(`http://localhost:3001/api/locations/${id}`, updatedLocation)
    .then(response => {
      alert("Location updated successfully!");
      setLocation(updatedLocation);
      setModal1(false);
    })
    .catch(error => {
      console.error('Error updating location:', error);
    });
}


async function addDeviceToLocation(event) {
  event.preventDefault();
  const randomUniqueNumber = Math.floor(Math.random() * 9000000000) + 1000000000;

  const deviceToAdd = {
      ...newDevice,
      uniqueNumber: randomUniqueNumber.toString(), 
  };

  if (image) {
    const data = new FormData();
    const filename = image.name;
    data.append('name', filename);
    data.append('file', image);
    deviceToAdd.image = filename;

    try {
        await axios.post('http://localhost:3001/api/upload', data);
    } catch (err) {
        console.log(err);
    }
  }
  
    axios
    .put(`http://localhost:3001/api/locations/${id}/addDevice`, deviceToAdd)
    .then((result) => {
        console.log(result);
        setNewDevice({
          uniqueNumber: '',
          type: '',
          status: '',
          image: null
        });
        setImage(null);
        alert('Device added successfully!');
        setModal2(false);
        window.location.reload();
        navigate(`/location/${id}`); 
    })
    .catch((error) => {
        console.error('Error during device adding:', error);
        alert('Failed to add device'); 
    });
}

  return (
    <div>
      <div className="top-right-buttons">
        <button className="button" onClick={toggleModal1}>Edit Location</button>
        <button className="button" onClick={() => setShowConfirmModal(true)}>Delete Location</button>
      </div>
      {showConfirmModal && (
        <ConfirmationModal
          isOpen={showConfirmModal}
          message="Are you sure you want to delete this location?"
          onConfirm={() => {
            deleteLocation(id); 
            setShowConfirmModal(false); 
          }}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
      
      <div className='details'>
        <h3>Name:  <span>{location.locationName}</span></h3>
        <h3>Address:  <span>{location.address}</span></h3>
        <h3>Phone:  <span>{location.contact}</span></h3>
      </div>
      
      <div className="devices-header">
        <h1 className='subheadings'>Devices</h1>
        <button className="button" onClick={toggleModal2}>Add Devices</button>
      </div>
      {
        location.devices.length === 0 && <h3 className='no-devices'>No devices found</h3>
      }
      <Cards devices={location.devices} />
      {modal1 && (
        <EditLocationModal
          isOpen={modal1}
          onClose={() => setModal1(false)}
          location={updatedLocation}
          onUpdate={setUpdatedLocation} 
          onSubmit={editLocation}
        />
      )}
      {modal2 && (
        <AddDeviceModal
          isOpen={modal2}
          onClose={() => setModal2(false)}
          newDevice={newDevice}
          image={image}
          setNewDevice={setNewDevice}
          setImage={setImage}
          onSubmit={addDeviceToLocation} 
        />
      )}
    </div>
  );
}

export default Location;
