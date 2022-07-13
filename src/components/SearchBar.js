import React from 'react'


export default function SearchBar({displayedStations, typeInSearch, clickStation, stationListRef, inputRef}) {
    
    return (
        
    <div className="SearchBar">
         <input 
        type="text" 
        className="inputField" 
        placeholder='Skriv tågstationen du vill se'
        onChange={typeInSearch}
        ref={inputRef}
        />
        <ul  className="list-group" ref={stationListRef}>
       
       {displayedStations.map((station) => {
        
        return(
        <button
            type="button"
            onClick={ (e) => {
                //console.log(station.AdvertisedLocationName)
                clickStation(e, station)
                }
            }    
            key={station.LocationSignature}
            className='list-group-item-action'
           
        >
            {station.AdvertisedLocationName}    
        </button>

       )})}

        </ul>

    </div>
    
  )
}
