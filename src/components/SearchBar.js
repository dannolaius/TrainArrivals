import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function SearchBar({displayedStations, typeInSearch, clickStation}) {
    return (
        
    <div className="SearchBar">
         <input 
        type="text" 
        className="inputField" 
        placeholder='Skriv tågstationen du vill se'
        onChange={typeInSearch}
        />
        <ul className='list-group'/>
       
       {displayedStations.map((station) => {
        return(
        <button
            type="button"
            onClick={(e) =>
                clickStation(e, station)
            }    
            key={station.LocationSignature}
            className='list-group-item-action'
           
        >
            {station.AdvertisedLocationName}    
        </button>
       )})}
        

    </div>
    
  )
}
