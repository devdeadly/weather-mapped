import React, {Component} from 'react';
import { GoogleMap, Marker } from "react-google-maps"
import ReactLoading from 'react-loading';
import axios from 'axios';
import _ from 'lodash';import Search from './Search';
import Summary from './Summary';
import Weekly from './Weekly';
import Daily from './Daily';
import Map from './Map';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

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
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_API_KEY}&address=${location}`)
      .then(resp => {
        /* 
          This destructures formatted address off resp.data.results[0]
          and lat, lng off resp.data.results[0].geometry.location
        */
        const { 
          formatted_address,
          address_components,
          geometry: { location: { lat, lng } }
        } = resp.data.results[0];
        this.getWeather(lat, lng);
        this.setState(() => ({
          formatted_address,
          short_name: resp.data.results[0].address_components[0].short_name
        }));
      });
  }
  getWeather = (lat, lng) => {
    axios.get(`/api/weather/${lat},${lng}`)
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
          <ReactLoading className="loader-svg" type="bubbles" color="#fff" height="300" width="300" />
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
