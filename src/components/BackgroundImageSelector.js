import React from 'react';
import '../css/backgroundSelector.css';

class BackgroundSelector extends React.Component {
  constructor(props) {
    super(props);
    this.mediaOptions = [
      { 
        type: 'video',
        url: 'https://lofico.nyc3.cdn.digitaloceanspaces.com/scenes/study/snow-scene.mp4',
        thumbnail: '%PUBLIC_URL%/thumbnails/studysnow.jpg',
        title: 'Snow Study'
      },
      {
        type: 'video',
        url: 'https://lofico.nyc3.cdn.digitaloceanspaces.com/scenes/cottage/cottage-exterior-final.mp4',
        thumbnail: '%PUBLIC_URL%/thumbnails/northenLights.png',
        title: 'Northen Lights'
      },
      {
        type: 'video',
        url: 'https://lofico.nyc3.cdn.digitaloceanspaces.com/scenes/plane/plane-night.mp4',
        thumbnail: '%PUBLIC_URL%/thumbnails/planeNight.png',
        title: 'Plane Night'
      },
      {
        type: 'video',
        url: 'https://lofico.nyc3.cdn.digitaloceanspaces.com/scenes/Cozy_Studio/Studio_day.mp4',
        thumbnail: '%PUBLIC_URL%/thumbnails/cozyBedroom.png',
        title: 'Cozy Bedroom'
      },
      {
        type: 'video',
        url: 'https://lofico.nyc3.cdn.digitaloceanspaces.com/scenes/chill-vibes/LVR%20STARRY%20NIGHT.mp4',
        thumbnail: '%PUBLIC_URL%/thumbnails/chillvibesnight.jpg',
        title: 'Night Time fireplace'
      },
      {
        type: 'video',
        url: 'https://lofico.nyc3.cdn.digitaloceanspaces.com/scenes/slowgarden/slow-garden-day.mp4',
        thumbnail: '%PUBLIC_URL%/thumbnails/gardenday.png',
        title: 'Isometric Garden'
      },
      {
        type: 'video',
        url: 'https://lofico.nyc3.cdn.digitaloceanspaces.com/scenes/slowgarden/slow-garden-night.mp4',
        thumbnail: '%PUBLIC_URL%/thumbnails/gardennight.png',
        title: 'Isometric Night Garden'
      },
      {
        type: 'video',
        url: 'https://lofico.nyc3.cdn.digitaloceanspaces.com/scenes/seoul/inside-night.mp4',
        thumbnail: '%PUBLIC_URL%/thumbnails/seoulnight.jpg',
        title: 'Seoul Night Appartment'
      },
      {
        type: 'video',
        url: 'https://lofico.nyc3.cdn.digitaloceanspaces.com/scenes/seoul/inside-day.mp4',
        thumbnail: '%PUBLIC_URL%/thumbnails/seoulday.jpg',
        title: 'Seoul Day Appartment'
      },

    ];
  }

  selectBackground = (media) => {
    console.log('Selected media:', media); // This will log the media object to the console
    this.props.onBackgroundChange(media);
};

  render() {
    return (
        <div className='backgroundSelectorContainer' id='third'>

          <div className='backgroundButtons'>
            {this.mediaOptions.map((media, index) => (
              <button key={index} onClick={() => this.selectBackground(media)} className="backgroundOption">
                <img src={media.thumbnail} alt={`Background ${index + 1}`} className="thumbnail" />
                {media.title}
              </button>
            ))}
          </div>

        </div>
    );
  }
}

export default BackgroundSelector;
