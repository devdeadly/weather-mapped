import React, {Component} from 'react';
import { GoogleMap, Marker } from "react-google-maps"
import ReactLoading from 'react-loading';
import axios from 'axios';
import _ from 'lodash';import Search from './Search';
import Summary from './Summary';
import Weekly from './Weekly';
import Daily from './Daily';
import Map from './Map';

const BASE_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';

export default class App extends Component {
  state = {
    weather: null,
    formatted_address: null,
    short_name: '',
    user: null
  }
  componentWillMount = () => {
    navigator.geolocation.getCurrentPosition(this.getUserCoordinates);
  }
  getUserCoordinates = (position) => {
    const { latitude, longitude } = position.coords
    this.setState(() => ({
      user: {
        lat : latitude,
        lng: longitude
      }
    }));
    this.getCoordinates(`${latitude},${longitude}`);
  }
  getCoordinates = (location) => {
    axios.post(`${BASE_URL}/api/location/`, {
      location
    })
      .then((resp) => {
        /* 
          This destructures formatted address off resp.data
          and lat, lng off resp.data.geometry.location
        */
        const { 
          formatted_address,
          address_components,
          geometry: { location: { lat, lng } }
        } = resp.data;
        this.getWeather(lat, lng);
        this.setState(() => ({
          formatted_address,
          short_name: resp.data.address_components[0].short_name
        }));
      });
  }
  getWeather = (lat, lng) => {
    axios.get(`${BASE_URL}/api/weather/${lat},${lng}`)
    .then((resp) => {
      this.setState(() => ({
        weather: resp.data,
      }))
    });
  }
  render() {
    const { weather, short_name, user } = this.state;
    const debouncedGetCoordinates = _.debounce((location) => { this.getCoordinates(location)}, 500)
    if (!user) {
      return (
        <div id="loader">
          <ReactLoading className="loader-svg" type="bubbles" color="#fff" />
        </div>
      )
    } else {
      return (
        <div>
          <Map isMarkerShown={true} {...this.state}/>
          <div id="gradient"></div>
          <div className="container">
            <Search getCoordinates={debouncedGetCoordinates}/>
            { weather && 
              <div>
                <div className="flex-container">
                  <Summary {...this.state} />
                </div>
                <div className="columns">
                  <div className="column is-one-third">
                    <Daily {...this.state}/>
                  </div>
                  <div className="column is-two-third">
                    <Weekly {...weather} />
                  </div>          
                </div>
              </div>
            }
          </div>      
        </div>
      );
    }
  }
}
