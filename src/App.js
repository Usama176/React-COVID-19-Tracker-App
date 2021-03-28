import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import LineGraph from "./components/LineGraph";
import Table from "./components/Table";
import { sortData, changeStatFormat } from "./components/AppUtilities";
import Map from "./components/Map";
import "leaflet/dist/leaflet.css";

// project url https://covid-19-tracker-820ec.web.app

const App = () => {
  
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -95.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  // api url "https://disease.sh/v3/covid-19/all"
  // fetch worldwide/all the data from api then passing to countryInfo
  // initially this data will appear before selecting a specific country

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

// api for all countries "https://disease.sh/v3/covid-19/countries"
// fetch all the data from api for all the countries
// and using in MenuItem and passing to the Map component and Table component

  useEffect(() => {
    const getCountriesData = async () => {
    await fetch("https://disease.sh/v3/covid-19/countries")
          .then((response) => response.json())
          .then((data) => {
            // get name and value from countries data
            const countries = data.map((country) => ({
              name: country.country,
              value: country.countryInfo.iso2,
            }));
            // passing all the data to sortData function imported from AppUtilities.js
            let sortedData = sortData(data);
            setTableData(sortedData);
            // pass countries to MenuItem
            setCountries(countries);
            // pass data to Map component
            setMapCountries(data);
          });
    };
    // function called
    getCountriesData();
  }, []);

// whenever the user changes the country this function will be called
  const onCountryChange = async (e) => {
    // get country code eg PK for pakistan
    const countryCode = e.target.value;
    const url = countryCode === "worldwide"
        // if the user choose worldwide
        ? "https://disease.sh/v3/covid-19/all"
        // if the user selct a specific country
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            // pass country code to the value of select
            setCountry(countryCode);
            setCountryInfo(data);
            { 
              // set map center and zoom if user select worldwide
              if (url === "https://disease.sh/v3/covid-19/all") {
              setMapCenter([34.80746, 30.4796])
              setMapZoom(2)
              } else {
                // set map center to the selected country
                 setMapCenter([data.countryInfo.lat, data.countryInfo.long])
                 setMapZoom(5)
                };
            }

          });
  };

  return (

    <div className="app">

      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              className='app__dropdownSelect'
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.key} value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Info Boxes and Map container */}

        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Cases"
            isRed
            active={casesType === "cases"}
            cases={changeStatFormat(countryInfo.todayCases)}
            total={changeStatFormat(countryInfo.cases)}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={changeStatFormat(countryInfo.todayRecovered)}
            total={changeStatFormat(countryInfo.recovered)}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={changeStatFormat(countryInfo.todayDeaths)}
            total={changeStatFormat(countryInfo.deaths)}
          />
        </div>
        {/* Map component */}
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      {/* Table and Graph container */}

      <Card className="app__right">
        <CardContent >
          <div className="app__information">
            {/* Table component */}
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />

            {/* Graph component */}
            <h3 className="app__graphTitle" >Worldwide new {casesType}</h3>
            <LineGraph className="app__lineGraph" casesType={casesType} />
          </div>
        </CardContent>
      </Card>

    </div>
  );
};

export default App;
