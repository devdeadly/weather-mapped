import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import moment from 'moment-timezone';


const getIcon = (str) => str.replace(/-/g, "_").toUpperCase();

export default (props) => {
  return (
    <div className="has-text-centered">
      <ReactAnimatedWeather
        icon={getIcon(props.weather.daily.icon)}
        color={'#ddd'}
        size={200}
        animate={true}
      />
      <div id="daily-summary">
        <em>{props.weather.daily.summary.slice(0, -1)}</em>
      </div>
      <h3 className="is-size-3" style={{ textTransform: 'none' }}>
        {Math.round(props.weather.currently.temperature)}°F
      </h3>
      <h3 className="is-size-3">
        {moment
          .unix(props.weather.currently.time)
          .tz(props.weather.timezone)
          .format('h:mm a')}
      </h3>
    </div>
  );
}
