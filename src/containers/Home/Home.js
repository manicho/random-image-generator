import React, { Component } from 'react';
import axios from 'axios';
import './home.scss';

class Home extends Component {
  state = {
    apiKey: process.env.API_KEY,
    apiPhotoBaseUrl: 'https://api.pexels.com/v1',
    photos: [],
    currentPage: null,
    totalResults: null,
    category: '',
    loading: false,
    isOpen: false,
    modalCurrentImage: '',
    modalCurrentPhotographerName: '',
    modalCurrentPhotographerUrl: '',
  };

  updateValues = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  getNewPhoto = async (e) => {
    this.setState({ loading: true });
    const { category } = this.state;
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${this.state.apiPhotoBaseUrl}/search?query=${category}&per_page=50&locale=es-ES`,
        {
          headers: {
            Authorization: this.state.apiKey,
          },
        }
      );
      this.setState({
        photos: data.photos,
        currentPage: data.page,
        totalResults: data.total_results,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  closeModal = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  setModalContent = (image, photographer) => {
    this.setState({
      modalCurrentImage: image,
      modalCurrentPhotographerName: photographer.photographerName,
      modalCurrentPhotographerUrl: photographer.photographerUrl,
      isOpen: true,
    });
  };

  render() {
    const { getNewPhoto, updateValues, setModalContent } = this;
    const {
      photos,
      category,
      loading,
      isOpen,
      modalCurrentImage,
      modalCurrentPhotographerName,
      modalCurrentPhotographerUrl,
    } = this.state;
    return (
      <div className='container-fluid'>
        <div className='container mb-5 mt-5'>
          <h1 className='jumbotron-heading text-center'>
            Get 50 random images
          </h1>
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
                  <img
                    className='photo-image'
                    src={photo.src.medium}
                    onClick={() =>
                      setModalContent(photo.src.large2x, {
                        photographerName: photo.photographer,
                        photographerUrl: photo.photographer_url,
                      })
                    }
                  />
                </div>
              ))}
          </div>
          {isOpen && (
            <div className='modal'>
              <span
                className='close-x'
                onClick={() =>
                  this.setState({
                    isOpen: false,
                    modalCurrentImage: '',
                    modalCurrentPhotographerName: '',
                    modalCurrentPhotographerUrl: '',
                  })
                }
              >
                &times;
              </span>
              <div className='images-carrousel'>
                <i className='fa fa-angle-left arrow left'></i>
                <img
                  className='modal-content pointer-none'
                  src={modalCurrentImage}
                />
                <i className='fa fa-angle-right arrow right'></i>
              </div>
              <div id='caption'>
                photo by {' '}
                <a
                  href={modalCurrentPhotographerUrl}
                  target='_blank'
                  rel='noreferrer'
                >
                  {modalCurrentPhotographerName}
                </a>
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default Home;
