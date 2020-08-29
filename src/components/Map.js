import React from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";
import { compose, withProps } from "recompose";
import mapStyles from "../../mapStyles.json";
import { GOOGLE_API_KEY } from "../config"; // config.example

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: (
      <div id="map">
        <div id="map-overlay"></div>
      </div>
    ),
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  return (
    <div>
      {props.weather ? (
        <div>
          <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: props.user.lat, lng: props.user.lng }}
            center={{
              lat: props.weather.latitude,
              lng: props.weather.longitude,
            }}
            defaultOptions={{
              styles: mapStyles,
              zoomControl: false,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: false,
            }}
          >
            {props.isMarkerShown && (
              <Marker
                position={{
                  lat: props.weather.latitude,
                  lng: props.weather.longitude,
                }}
              />
            )}
          </GoogleMap>
        </div>
      ) : (
        <div>
          <GoogleMap
            defaultZoom={8}
            center={{ lat: props.user.lat, lng: props.user.lng }}
            defaultOptions={{
              styles: mapStyles,
              zoomControl: false,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: false,
            }}
          >
            {props.isMarkerShown && (
              <Marker position={{ lat: props.user.lat, lng: props.user.lng }} />
            )}
          </GoogleMap>
        </div>
      )}
    </div>
  );
});

export default Map;
