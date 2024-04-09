import React from 'react';
import firebase from '../firebase'; // Adjust the path as needed
import '../css/settings.css';
import { IoMdClose, IoMdCreate } from "react-icons/io"; // Assuming you use React Icons for the edit icon
import { FaRegCheckCircle } from "react-icons/fa";
import BackgroundSelector from './BackgroundImageSelector'; // Adjust path as necessary
import GeoCodeFromPostcode from './geocode';


class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'Set First Name',
      isEditing: false // Track whether the user is editing the first name
    };

    // Binding this to work in the callback
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchFirstName = this.fetchFirstName.bind(this);
  }

  componentDidMount() {
    this.fetchFirstName();
  }

  toggleBottomMenuVisibility = () => {
    const bottomMenu = document.querySelector('.settingsWrapper');
    if (bottomMenu) {
        const isHidden = bottomMenu.style.display === 'none';
        bottomMenu.style.display = isHidden ? '' : 'none';
    }
}

  fetchFirstName() {
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase.firestore().collection('users').doc(user.uid);
      userRef.get().then((doc) => {
        if (doc.exists) {
          this.setState({ firstName: doc.data().firstName || 'Set First Name' });
        }
      }).catch((error) => {
        console.error("Error fetching document: ", error);
      });
    }
  }

  toggleEdit() {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing
    }));
  }

  handleChange(event) {
    this.setState({firstName: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase.firestore().collection('users').doc(user.uid);
      userRef.set({
        firstName: this.state.firstName
      }, { merge: true })
      .then(() => {
        console.log("Document successfully updated!");
        this.toggleEdit(); // Turn off editing mode after saving
        window.location.reload(); // Refresh the page to reflect changes
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
    }
  }



  

  render() {
    const { firstName, isEditing } = this.state;
    const { onBackgroundChange } = this.props; // Destructure to get the method passed as a prop
    
    return (
        <div className='settingsWrapper' id='Settings'>
            <h3>Preferences<p>Click outside of menu to close</p></h3>
            <div className='userDetails'>

            <div className='userDetailsField'>
                <p className='settingsLabel'>First Name</p>
                {isEditing ? (
                  <form onSubmit={this.handleSubmit} autoComplete="off">
                    <input type='text' name='firstName' onChange={this.handleChange}/>
                    <button type="submit"><FaRegCheckCircle /></button>
                  </form>
                ) : (
                  <div className='settingsValueWrapper'>
                    <span className='settingsValue'>{firstName}</span>
                    <button className='editButton' onClick={this.toggleEdit}><IoMdCreate /></button>
                  </div>
                  
                )}
            </div>

            <div className='userDetailsField'>
            <p className='settingsLabel'>Update Weather Location</p>
                <GeoCodeFromPostcode></GeoCodeFromPostcode>
            </div>

            </div>
            <p className='settingsLabel'>Change Background</p>
            <BackgroundSelector onBackgroundChange={onBackgroundChange} />
        </div>
    );
  }
}

export default Settings;
