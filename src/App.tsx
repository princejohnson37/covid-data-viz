import React, { useState } from 'react';
import './App.css';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import Plot from 'react-plotly.js';
import data from './data.json';
import MapComponent from './components/MapComponent';

interface CovidData {
  Id: number;
  Location: string;
  Total_Cases: string;
  New_Cases_Per_Day: string;
  Cases_Per_1_Million_People: string;
  Deaths: string;
  Latitude: number;
  Longitude: number;
}

function App() {
  const [activeCovid, setActiveCovid] = useState<CovidData | undefined>(undefined);
  const x_labels = [
    "Total Cases",
    "Active Cases",
    "Recovered",
    "Deaths",
  ]
  const y_values_string = [
    activeCovid?.Total_Cases,
    activeCovid?.New_Cases_Per_Day,
    activeCovid?.Cases_Per_1_Million_People,
    activeCovid?.Deaths
  ]

  const y_values = y_values_string.map((value: String | undefined) => {
    if (!isNaN(parseFloat(value))) {

    }

    return (
      <div className="App">
        <select name='state' id='state'>
          {data.map((value, index) => {
            console.log(value.Location)
            return <option key={index} value={value.Location} onClick={() => setActiveCovid(value)}>{value.Location}</option>
          })}

        </select>
        <Plot
          data={[
            {
              x: x_labels,
              y: y_values,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
            },
            { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
          ]}
          layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
        />
        <MapComponent data={data} />
      </div>
    );
  }

export default App;
