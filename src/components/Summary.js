import React from 'react';

export default (props) => (
  <div id="summary">
    <h2 className="is-size-2">{props.formatted_address}</h2>
    <h5 className="is-size-5">
      <em>{props.weather.daily.summary}</em>
    </h5>
  </div>
);
