import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Header'
import SearchBar from './components/SearchBar';
import axios from "axios"
import { Component, useEffect, useState, useRef } from 'react';
import ArrivalCard from './components/ArrivalCard';




function App() {
  const [displayedStations, setDisplayedStations] = useState([])
  const [allStations, setAllStations] = useState([])
  const [selectedStation, setSelectedStation] = useState([])
  const [currentArrivals, setCurrentArrivals] = useState([])
  const stationListRef = useRef(null)
  const inputRef = useRef(null)
 
  // The body for request to get station
  const stationBody = `<REQUEST>
  <LOGIN authenticationkey="${process.env.REACT_APP_API}" />
  <QUERY objecttype="TrainStation" schemaversion="1">
            <FILTER>
                  <EQ name="Advertised" value="true" />
            </FILTER>
            <INCLUDE>LocationSignature</INCLUDE>
            <INCLUDE>AdvertisedLocationName</INCLUDE>
      </QUERY>
</REQUEST>`

//The body for request to get arrivals for a station
const arrivalsBody = `<REQUEST>
  <LOGIN authenticationkey="${process.env.REACT_APP_API}" />
  <QUERY objecttype="TrainAnnouncement" schemaversion="1.6" orderby="AdvertisedTimeAtLocation" limit="5">
    <FILTER>
      <AND>
        <EQ name="ActivityType" value="Avgang" />
        <EQ name="LocationSignature" value="${selectedStation.LocationSignature}" />
        <OR>
          <AND>
            <GT name="AdvertisedTimeAtLocation" value="$dateadd(00:00:00)" />
            <LT name="AdvertisedTimeAtLocation" value="$dateadd(14:00:00)" />
          </AND>
        </OR>
      </AND>
    </FILTER>
    <INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
    <INCLUDE>FromLocation</INCLUDE>
    <INCLUDE>ToLocation</INCLUDE>
    <INCLUDE>ActivityId</INCLUDE>
  </QUERY>
</REQUEST>`

/**
 * Function that updates everytime you type into search box. 
 * Changes the values in the dropbox
 * @param {*} e contains values for the search field
 */
  const typeInSearch = (e) => {
    //console.log(e)
    //console.log(e.target.value);
    setDisplayedStations(
      allStations.filter((station) => station.AdvertisedLocationName.toLowerCase().includes(e.target.value.toLowerCase()))
    );
    }
/**
 * Function that updates everytime you click on a station from the dropdown.
 * Changes the current station and updates the arrivals.
 * @param {*} e stats about the click
 * @param {*} station contains the station name or the station tag
 */
  const clickStation = (e, station) => {
      //console.log(station)
      setSelectedStation(station)
      // console.log(station)
    }
/**
 * runs getarrivals when selected station is updated.
 */
  useEffect(() => {
    /**
 * Gets arrivals for the station you last clicked
 */
  const getArrival = async () => {
    const result = await axios.post(
     `https://api.trafikinfo.trafikverket.se/v2/data.json`, arrivalsBody,{
          headers: {
            'Content-Type' : 'text/plain'
          }
        }
        )
        //console.log(arrivalsBody)
        //console.log(result.data.RESPONSE.RESULT[0].TrainAnnouncement)
        setCurrentArrivals(result.data.RESPONSE.RESULT[0].TrainAnnouncement) 
  }
      getArrival()
  }, [selectedStation])

  
  useEffect(()=> {
  
    document.addEventListener('click', (e) => {
      stationListRef.current.style.display="none"
    })
    inputRef.current.addEventListener('click', (e) => {
      stationListRef.current.style.display='flex'
      e.stopPropagation()
    })

    const fetchStations = async () => {
      const result = await axios.post(
        `https://api.trafikinfo.trafikverket.se/v2/data.json`, stationBody,{
          headers: {
            'Content-Type' : 'text/plain'
          }
        }
        )
      
      //console.log(result.data.RESPONSE.RESULT[0].TrainStation)
      setAllStations(result.data.RESPONSE.RESULT[0].TrainStation)
    }

    fetchStations()
  }, [])

  return (
    <div className="row">
      <Header />
      <div className="left-panel">
        <SearchBar 
          displayedStations={displayedStations} 
          typeInSearch={typeInSearch} clickStation={clickStation}
          stationListRef={stationListRef} 
          inputRef={inputRef}/>
      </div>
      <div className="right-panel">
      <ArrivalCard selectedStation={selectedStation} currentArrivals={currentArrivals} allStations={allStations}/>    
      </div>
    </div>
  );

 

}

export default App;
