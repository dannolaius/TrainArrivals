import React from 'react'

export default function ArrivalCard({ selectedStation, currentArrivals, allStations}) {
  return (
    
    <div className='Arrival'> 
    <h3>Ankomster till {selectedStation.AdvertisedLocationName}</h3>
    {currentArrivals.map((arrival) => {
     const [date, time_untrimmed] = arrival.AdvertisedTimeAtLocation.split('T')
      const time = time_untrimmed.split('.')[0].substring(0,5)
      //console.log(time)
      //console.log(arrival.FromLocation[0].LocationName !== undefined)
      let from;
      if(arrival.FromLocation === undefined){
        from = "?"
      }else{
        from = allStations.filter((station) => station.LocationSignature === arrival.FromLocation[0].LocationName)[0].AdvertisedLocationName
      }
      let to;
      if(arrival.ToLocation === undefined){
        to = "?"
      }else{
        to = allStations.filter((station) => station.LocationSignature === arrival.ToLocation[0].LocationName)[0].AdvertisedLocationName
      }
      return(
        <div className="card" key={arrival.ActivityId} style={{flex: 5}}>
          <div className="card-body">
            <h5 className="card-title">Ankommer {time} </h5>
            <p className="card-text">Från {from}</p>
            <p className="card-text">Till {to}</p>

          </div>
        </div>
      )
    })}
    </div>
  )
}
