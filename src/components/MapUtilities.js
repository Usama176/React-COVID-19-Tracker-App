import React from "react";
import numeral from "numeral";
import { Circle, Popup, useMap } from "react-leaflet";

// this function will change the center and zoom of the map based on the country selected
export function ChangeView({ center, zoom }) {
    const map = useMap();
    map.flyTo(center,zoom,{
      duration: 2,
  })
  return null;
};

// for circle styling based on the casesType
const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 300,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 350,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 400,
  },
};

export const showDataOnMap = (data, casesType) => {

  return (data.map((country) => (
    // circles on the map based on the casesType
    <Circle
      key={country.key}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      pathOptions={{
        color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex 
      }}
      fillOpacity={0.3}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      {/* on click the popup appear on the circle containing all the information */}
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0.00a")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0.00a")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0.00a")}
          </div>
        </div>
      </Popup>
    </Circle>
  )))
};