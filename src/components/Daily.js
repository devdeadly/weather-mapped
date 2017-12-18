import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import moment from 'moment-timezone';


const getIcon = (str) => str.replace(/-/g, "_").toUpperCase();

export default (props) => {
  return (
    <div>
      <div className="flex-container">
        <ReactAnimatedWeather
          icon={getIcon(props.weather.daily.icon)}
          color={'#ddd'}
          size={200}
          animate={true}
        />
      </div>
      <div className="flex-container jc-sa">
        <h3 className="is-size-3">
          {Math.round(props.weather.currently.temperature)}°F
        </h3>
        <h3 className="is-size-3">
          {moment
            .unix(props.weather.currently.time)
            .tz(props.weather.timezone)
            .format('h:mm a')}
        </h3>
      </div>
      <div className="flex-container">
        <h5 className="is-size-5">
            {props.weather.daily.summary}
        </h5>
      </div>
    </div>
  );
}
// <button className="button is-link" onClick={() => console.log(props)}>Daily Props</button>
