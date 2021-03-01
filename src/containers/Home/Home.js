import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
  state = {
    apiKey: '563492ad6f91700001000001800c3755a9b34997a76d0bea496f710f',
    apiPhotoBaseUrl: 'https://api.pexels.com/v1',
    imageUrl: '',
    photos: '',
    test: process.env.TEST
  }

  getNewPhoto = async (e) => {
    e.preventDefault()
    try {
      const { data: {
        photos
      } } = await axios.get(`${this.state.apiPhotoBaseUrl}/search?query=nature`, {
        headers: {
          Authorization: this.state.apiKey
        }
      })
      console.log('respuesta desde api: ', photos)
      this.setState({ photos, imageUrl: photos[1].src.medium })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { getNewPhoto } = this;
    const { imageUrl } = this.state;
    return (
      <div className="flex">

        <div className="container">
          <h1 className="jumbotron-heading">Configura tu imagen</h1>
          <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks dont simply skip over it entirely.</p>
          {/* <p>
            <a href="#" class="btn btn-primary my-2">Main call to action</a>
            <a href="#" class="btn btn-secondary my-2">Secondary action</a>
          </p> */}
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-4">
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


        {/* <div class="container">

          <div class="row">
            <div class="col-md-4">
              <div class="card mb-4 box-shadow">
                <div>
                  <div>
                <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22348%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20348%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_177eb6f208b%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A17pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_177eb6f208b%22%3E%3Crect%20width%3D%22348%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22116.68333435058594%22%20y%3D%22120.3%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true">
                <div class="card-body">
                  <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small class="text-muted">9 mins</small>
                  </div>
                </div>
              </div>
            </div>
            </div>
            </div>
            </div>
            </div> */}

        <button onClick={getNewPhoto}>Cambia la foto</button>
      </div>
    );
  }
}

export default Home;