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
        `${this.state.apiPhotoBaseUrl}/search?query=${category}&per_page=25&locale=es-ES`,
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
        <section className="section">
          <div className='grid'>
            <div className='item'>
            {photos.length > 0 &&
                !loading &&
                photos.map((photo, index) => (
                  <img
                    src={photo.src.medium}
                    key={index}
                  />
                  /* <div className='card-body'>
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
                </div> */
                ))}
            </div>
          
          </div>
        </section>
        <section className='container-fluid'>
          <div className='row'>
            <div className='col-lg-3 col-md-3 col-sm-6 col-xs-6'>
              
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
