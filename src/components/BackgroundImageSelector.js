import React from 'react';
import '../css/backgroundSelector.css';

class BackgroundSelector extends React.Component {
  constructor(props) {
    super(props);
    this.mediaOptions = [
      { 
        type: 'image',
        url: 'https://t4.ftcdn.net/jpg/04/61/47/03/360_F_461470323_6TMQSkCCs9XQoTtyer8VCsFypxwRiDGU.jpg',
        thumbnail: 'https://via.placeholder.com/150'
      },
      {
        type: 'video',
        url: 'https://lofico.nyc3.cdn.digitaloceanspaces.com/scenes/Cozy_Studio/Studio_day.mp4',
        thumbnail: 'https://via.placeholder.com/150'
      },
      {
        type: 'video',
        url: 'https://lofico.nyc3.cdn.digitaloceanspaces.com/scenes/Cozy_Studio/Studio_day.mp4',
        thumbnail: 'https://via.placeholder.com/150'
      },
      {
        type: 'video',
        url: 'https://lofico.nyc3.cdn.digitaloceanspaces.com/scenes/Cozy_Studio/Studio_day.mp4',
        thumbnail: 'https://via.placeholder.com/150'
      },
    ];
  }

  selectBackground = (media) => {
    this.props.onBackgroundChange(media);
  };

  render() {
    return (
        <div className='backgroundSelectorContainer' id='third'>
          <div className="backgroundHeader">Background Selection</div>

          <div className='backgroundButtons'>
            {this.mediaOptions.map((media, index) => (
              <button key={index} onClick={() => this.selectBackground(media)} className="backgroundOption">
                <img src={media.thumbnail} alt={`Background ${index + 1}`} className="thumbnail" />
                Select Background {index + 1} ({media.type})
              </button>
            ))}
          </div>

        </div>
    );
  }
}

export default BackgroundSelector;
