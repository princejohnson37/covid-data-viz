import React, { useEffect, useState } from 'react';
import MapComponent from './components/MapComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { fetchData } from './redux/slice/slice';
import { CovidDataItem } from './types/types';
import CustomChart from './components/CustomChart';
import './App.css';

function App() {

  const dispatch = useDispatch<AppDispatch>();
  const { covidData, status, error } = useSelector((state: RootState) => state.data);
  const [activeCovid, setActiveCovid] = useState<CovidDataItem | undefined>(covidData[0] ?? undefined);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchData())
    }
    if (status === 'succeeded') {
      setActiveCovid(covidData[0])
    }
  }, [status, dispatch]);

  const x_labels = [
    "Total Cases",
    "Active Cases",
    "Recovered",
    "Deaths",
  ]
  const y_values = [
    activeCovid?.Confirmed,
    activeCovid?.Active,
    activeCovid?.Recovered,
    activeCovid?.Deaths
  ].map((value: any) => (
    parseFloat(value || 0)
  ))



  const handleOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const state = event.target.value
    const selectedCovid = covidData.find((covid) => covid.State === state)
    setActiveCovid(selectedCovid)
  }

  return (
    <>
    <nav className="navbar">Covid Report</nav>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && <div>Error: {error}</div>}
      {status === 'succeeded' &&
        (<div className="App">
          <div className='select-state-div'>
            Select State:
            <select className='select-state' name='state' onChange={handleOnSelect}>
              {covidData?.map((state) => (
                <option value={state.State} key={state.State} >
                  {state.State}
                </option>
              ))}
            </select>
          </div>
          <div className='charts'>
            <CustomChart xLabels={x_labels} yValues={y_values} />
            <CustomChart xLabels={x_labels} yValues={y_values} charType='pie' />
          </div>
          <MapComponent data={covidData} selectedState={activeCovid?.State} />
        </div>)}
    </>
  );
}

export default App;
