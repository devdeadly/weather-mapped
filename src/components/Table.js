import React, { Component } from 'react';
import moment from 'moment-timezone';
import ReactAnimatedWeather from 'react-animated-weather';

const getIcon = (str) => str.replace(/-/g, "_").toUpperCase();

export default (props) => {
  return (
    <div>
      {
        props.daily && 
        <div>
          <table className="table is-narrow">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Low</th>
                <th>High</th>
                <th className="summary">Summary</th>
              </tr>
            </thead>
            <tbody>
              {
                props.daily.data.map((day, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        { moment
                            .unix(day.time)
                            .tz(props.timezone)
                            .format('dddd') }
                      </td>
                      <td>
                        <ReactAnimatedWeather
                          icon={getIcon(day.icon)}
                          color={'#ddd'}
                          size={25}
                          animate={true}
                        />
                      </td>
                      <td>{Math.round(day.temperatureLow)}</td>
                      <td>{Math.round(day.temperatureHigh)}</td>
                      <td className="summary">{day.summary.slice(0, -1)}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>   
        </div>       
      }
    </div>
  );
}
// <button className="button is-link" onClick={() => console.log(props)}>Table Props</button>


