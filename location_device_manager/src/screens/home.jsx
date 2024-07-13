import React,{useState, useEffect} from 'react'
import List from '../components/list/list';
import axios from 'axios';
import AddLocationModal from '../components/modals/add_location_modal';

const Home = () => {
  const [modal, setModal] = useState(false);
  const [locationsList, setLocations] = useState([]);
  const [location, setLocation] = useState({
    locationName:'',
    address:'',
    contact:'',
    devices:[]
  })

  const toggleModal = () => {
      setModal(!modal);
  };

  useEffect(() => {
    axios.get('http://localhost:3001/api/locations/all')
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  function addLocation(event) {
    axios
        .post("http://localhost:3001/api/locations/", location)
        .then((result) => {
            console.log(result);
            setLocation({    
            locationName:'',
            address:'',
            contact:'',
            devices:[]});
            alert('Location added successfully!'); 
        })
        .catch((error) => {
            console.error('Error during location adding:', error);
            alert('Failed to add location'); 
        });
  }

  
  return (
    <div className='home'>
      <div className="top-right-buttons">
        <button className="button" onClick={toggleModal}>Add Location</button>
      </div>
        <h1 className='headings'>Locations</h1>
        <div className='list-container' >
        {locationsList.map((location)=>{
            return (
              <List
                  key={location._id}
                  id={location._id}
                  locationName={location.locationName}
              />
            )
          })}
        </div>
        {modal && (
          <AddLocationModal
          isOpen={modal}
          onClose={() => setModal(false)}
          onSubmit={addLocation} 
          setLocation={setLocation}
        />
        )}
    </div>
  )
}

export default Home;
