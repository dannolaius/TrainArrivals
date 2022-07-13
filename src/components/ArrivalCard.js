import React from 'react'

export default function ArrivalCard({ selectedStation}) {
  return (
    
    <div className='Arrival'> Ankomster till {selectedStation.AdvertisedLocationName}</div>
  )
}
