import React from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import "../components_css/Map.css";
import { ChangeView, showDataOnMap } from "./MapUtilities";

// using react-leaflet map

function Map({ countries, casesType, center, zoom }) {

  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>

        {/* changeView set the map center whenever the state changes */}
        <ChangeView casesType={casesType} center={center} zoom={zoom} />
        <TileLayer 
          url = 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png'
          attribution = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
