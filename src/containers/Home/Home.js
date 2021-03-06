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
    currentImageNumber: null,
    category: '',
    loading: false,
    isOpen: false,
    modalCurrentImage: '',
    modalCurrentPhotographerName: '',
    modalCurrentPhotographerUrl: '',
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false);
  }

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

  setModalContent = (image, photographer, currentImageNumber) => {
    this.setState({
      modalCurrentImage: image,
      modalCurrentPhotographerName: photographer.photographerName,
      modalCurrentPhotographerUrl: photographer.photographerUrl,
      currentImageNumber,
      isOpen: true,
    });
  };

  handleKeyPress = (e) => {
    const { isOpen } = this.state;
    if (e.keyCode == 27 && isOpen)
      this.setState({
        isOpen: false,
        modalCurrentImage: '',
        modalCurrentPhotographerName: '',
        modalCurrentPhotographerUrl: '',
      });
  };

  goToImage = (e) => {
    e.preventDefault();
    const { currentImageNumber, photos } = this.state;
    const { setModalContent } = this;
    const direction = e.target.id
    const currentImageObject = photos[currentImageNumber]
    const image = currentImageObject.src.large2x
    const photographer = {
      photographerName: currentImageObject.photographer,
      photographerUrl: currentImageObject.photographer_url
    }

    if (direction === 'left-arrow' && currentImageNumber > 0) setModalContent(image, photographer, currentImageNumber - 1);
    if (direction === 'right-arrow' && currentImageNumber < 50) setModalContent(image, photographer, currentImageNumber + 1);
    
  };

  render() {
    const {
      getNewPhoto,
      updateValues,
      setModalContent,
      handleKeyPress,
      goToImage,
    } = this;
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
                      setModalContent(
                        photo.src.large2x,
                        {
                          photographerName: photo.photographer,
                          photographerUrl: photo.photographer_url,
                        },
                        index
                      )
                    }
                  />
                </div>
              ))}
          </div>
          {isOpen && (
            <div className='modal' onKeyPress={handleKeyPress}>
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
                <i
                  id='left-arrow'
                  className='fa fa-angle-left arrow left'
                  onClick={goToImage}
                ></i>
                <img
                  className='modal-content pointer-none'
                  src={modalCurrentImage}
                />
                <i
                  id='right-arrow'
                  className='fa fa-angle-right arrow right'
                  onClick={goToImage}
                ></i>
              </div>
              <div id='caption'>
                photo by{' '}
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
