import React from 'react';
import Firebase from "firebase";

import { useStateValue } from '../state';
import Button from './button';
import Description from './description';
import Fade from './fade';

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
    if (navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition(getPosition);
    }
    alert("Thanks for adding your location! Go ahead and explore the globe.")
  }
  
  function getPosition(position) {
    const place = {"latitude": position.coords.latitude, "longitude": position.coords.longitude}
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
