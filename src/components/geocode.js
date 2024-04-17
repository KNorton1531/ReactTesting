import React from 'react';
import firebase from '../firebase'; // Ensure this path is correct for your Firebase config
import { FaRegCheckCircle } from "react-icons/fa";

class GeoCodeFromPostcode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postcode: '',
      coordinates: { lat: null, lon: null },
      showError: false // State to control the visibility of the error message
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.geocodePostcode = this.geocodePostcode.bind(this);
  }

  handleChange(event) {
    this.setState({
      postcode: event.target.value,
      showError: false // Reset error on change
    });
  }

  async geocodePostcode() {
    const apiKey = 'cc5b62aa07e0488abe8e4f920d4681ed'; // Replace with your actual API key
    const { postcode } = this.state;
    const apiUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(postcode)}&apiKey=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (!response.ok) throw new Error('Failed to fetch coordinates');
      if (data.features && data.features.length > 0) {
        const [lon, lat] = data.features[0].geometry.coordinates;
        this.setState({ coordinates: { lat, lon } });
        return { lat, lon }; // Return coordinates for further processing
      } else {
        console.log('No results found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
      return null;
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const postcodeRegex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))[0-9][A-Za-z]{2})$/;
    if (!postcodeRegex.test(this.state.postcode)) {
      this.setState({ showError: true }); // Set error state to true if validation fails
      console.error("Error: Postcode format is invalid.");
      return; // Stop execution if the postcode format is invalid
    }
    const { lat, lon } = await this.geocodePostcode();
    if (lat && lon) {
      const user = firebase.auth().currentUser;
      if (user) {
        const userRef = firebase.firestore().collection('users').doc(user.uid);
        userRef.set({
          coordinates: { lat, lon }
        }, { merge: true })
        .then(() => {
          console.log("Coordinates successfully updated!");
          window.location.reload(); // Refresh the page to reflect changes
        })
        .catch((error) => {
          console.error("Error updating coordinates: ", error);
        });
      }
    }
  }

  render() {
    const { postcode, showError } = this.state;
    
    return (
      <form onSubmit={this.handleSubmit} autoComplete="off">
              {showError && <div className='postcodeError'>Invalid format. Please make sure to <u><b>not</b></u> add spaces</div>}
                <input
                  type='text'
                  name='postcode'
                  value={postcode}
                  onChange={this.handleChange}
                  placeholder="Enter postcode"
                />
                <button type="submit"><FaRegCheckCircle /></button>
            </form>
    );
  }
}

export default GeoCodeFromPostcode;
