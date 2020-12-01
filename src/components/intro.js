import React from 'react';
import Firebase from "firebase";

import { useStateValue } from '../state';
import Button from './button';
import Description from './description';
import Fade from './fade';

import Geocode from "react-geocode";
global.fetch = require("node-fetch");
Geocode.setApiKey("AIzaSyBUvdk9G80gwkj9rxSPeXeKpFgaj9hlt70");

export default function Intro() {
  const [{ hasLoaded, start }, dispatch] = useStateValue();
  let submitted = false;
  let config = {
    apiKey: "AIzaSyCdHNzrvVGcRDsmd2V0h1Y2wlMlf0FNutE",
    authDomain: "mcmasterholiday2020.firebaseapp.com",
    databaseURL: "https://mcmasterholiday2020.firebaseio.com",
    projectId: "mcmasterholiday2020",
    storageBucket: "mcmasterholiday2020.appspot.com",
    messagingSenderId: "747019401291"
  };

  if (!Firebase.apps.length) {
    Firebase.initializeApp(config);
 }
  
  function addLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
      alert("Thanks for adding your location! Go ahead and explore the globe.")
    }
    if (submitted === true){
      alert("You have already added your location. Thanks for contributing to our 2020 Holiday map.")
    }
    
  }
  
  async function getPosition(position) {
    const place = {"latitude": position.coords.latitude, "longitude": position.coords.longitude}
    let city = await Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(res => {
      return res.results[0].formatted_address.split(',')[1].replace(/\s/g, '');
    })
    place.city = city;
    if (!submitted){
      Firebase.database()
      .ref("/location")
      .push(place);
      submitted = true;
    }
  };
  
  return (
    <Fade className="intro" show={!start}>
      <h1>McMaster Holiday Map</h1>
      <p>
        <Description />
      </p>
      
      <Fade show={hasLoaded}>
        <Button label="Add your Location!" onClick={() => addLocation()} /> &nbsp;&nbsp;&nbsp;
        <Button label="Explore" onClick={() => dispatch({ type: 'START' })} />
      </Fade>
    </Fade>
  );
}
