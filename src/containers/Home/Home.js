import React, { Component } from 'react';
import axios from 'axios';
import './home.scss';

class Home extends Component {
  state = {
    apiKey: process.env.API_KEY,
    apiPhotoBaseUrl: 'https://api.pexels.com/v1',
    photos: [],
    category: '',
    loading: false,
  };

  updateValues = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getNewPhoto = async (e) => {
    this.setState({ loading: true });
    const { category } = this.state;
    e.preventDefault();
    try {
      const {
        data: { photos },
      } = await axios.get(
        `${this.state.apiPhotoBaseUrl}/search?query=${category}&per_page=50&locale=es-ES`,
        {
          headers: {
            Authorization: this.state.apiKey,
          },
        }
      );
      this.setState({ photos, loading: false });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { getNewPhoto, updateValues } = this;
    const { photos, category, loading } = this.state;
    return (
      <div className='container-fluid'>
        <div className='container mb-5'>
          <h1 className='jumbotron-heading text-center'>
            Get 50 random images
          </h1>
          <p className='lead text-muted text-center'>
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks dont simply skip over it entirely.
          </p>
        </div>
        <div className='d-flex justify-content-center'>
          <form onSubmit={getNewPhoto}>
            <label>Enter photo category:</label>
            <input
              className='filter-input'
              name='category'
              maxLength='50'
              autoComplete='off'
              placeholder='nature'
              type='text'
              value={category}
              onChange={updateValues}
            />
            <button
              className='btn btn-dark'
              type='submit'
              disabled={category.length < 3}
            >
              Muestrame nuevas imagenes!
            </button>
          </form>
        </div>
        {loading && (
          <div className='d-flex justify-content-center'>
            <div className='spinner-border' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        )}
        <section className='photo-grid mt-5'>
          <div className='photo-list'>
            {photos.length > 0 &&
              !loading &&
              photos.map((photo, index) => (
                <div className='photo-element' key={index}>
                  <img className='photo-image' src={photo.src.large} />
                  {/* <figcaption className='photo-caption'>photo by {photo.photographer}</figcaption> */}
                </div>
              ))}
          </div>
        </section>
        <section className='container-fluid'>
          <div className='row'>
            <div className='col-lg-3 col-md-3 col-sm-6 col-xs-6'></div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
