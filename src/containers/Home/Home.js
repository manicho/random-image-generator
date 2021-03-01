import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
  state = {
    apiKey: '563492ad6f91700001000001800c3755a9b34997a76d0bea496f710f',
    apiPhotoBaseUrl: 'https://picsum.photos',
    imageUrl: '',
    photos: '',
    test: process.env.TEST
  }

  getNewPhoto = async (e) => {
    e.preventDefault()
    try {
      const data = await axios.get(`${this.state.apiPhotoBaseUrl}/500/300?random=1`)
      console.log('data: ', data)
      // this.setState({ imageUrl: `${this.state.apiPhotoBaseUrl}/800x600` })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { getNewPhoto } = this;
    const { imageUrl } = this.state;
    return (
      <div>

        <div className="container">
          <h1 className="jumbotron-heading text-center">Configura tu imagen</h1>
          <p className="lead text-muted text-center">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks dont simply skip over it entirely.</p>
          {/* <p>
            <a href="#" class="btn btn-primary my-2">Main call to action</a>
            <a href="#" class="btn btn-secondary my-2">Secondary action</a>
          </p> */}
        </div>

        <div className="container">
          <div className="row center">
            <div className="col">
              <div className="card mb-4 box-shadow">
                <img className="card-img-top" src={imageUrl} />
                <div className="card-body">
                  <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small className="text-muted">9 mins</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button onClick={getNewPhoto}>Nueva imagen random</button>
      </div>
    );
  }
}

export default Home;