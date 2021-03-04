import React, { Component } from 'react';
import axios from 'axios';
import './home.scss';

class Home extends Component {
  state = {
    apiKey: process.env.API_KEY,
    apiPhotoBaseUrl: 'https://api.pexels.com/v1',
    photos: [],
  };

  getNewPhoto = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { photos },
      } = await axios.get(
        `${this.state.apiPhotoBaseUrl}/search?query=nature&per_page=50`,
        {
          headers: {
            Authorization: this.state.apiKey,
          },
        }
      );
      this.setState({ photos });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { getNewPhoto } = this;
    const { photos } = this.state;
    return (
      <div>
        <div className='container mb-5'>
          <h1 className='jumbotron-heading text-center'>
            Get 50 random images
          </h1>
          <p className='lead text-muted text-center'>
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks dont simply skip over it entirely.
          </p>
          {/* <p>
            <a href="#" class="btn btn-primary my-2">Main call to action</a>
            <a href="#" class="btn btn-secondary my-2">Secondary action</a>
          </p> */}
        </div>

        <section className='cards'>
          {photos.length > 0 &&
            photos.map((photo, index) => (
              <div className='card mb-4 box-shadow' key={index}>
                <img className='card-img-top' src={photo.src.medium} />
                <div className='card-body'>
                  <p className='card-text'>{photo.photographer}</p>
                  <p className='card-text'>{photo.photographer_url}</p>
                  <div className='d-flex justify-content-center align-items-center'>
                    <button
                      type='button'
                      className='btn btn-sm btn-outline-secondary w-100'
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </section>
        <div className='d-flex justify-content-center'>
          Enter topic: <input />
          <button className="btn btn-dark" onClick={getNewPhoto}>Muestrame nuevas imagenes!</button>
        </div>
      </div>
    );
  }
}

export default Home;
