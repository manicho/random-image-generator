import React, { Component } from 'react';

class Home extends Component {
  state = {
    apiKey: '563492ad6f91700001000001800c3755a9b34997a76d0bea496f710f'
  }

  render() {
    return (
      <div>
        <h3>Home View{this.state.apiKey}</h3>
        <p> This is the home view of SPA</p>
      </div>
    );
  }
}

export default Home;