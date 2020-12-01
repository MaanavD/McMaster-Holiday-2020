import countryReverseGeoCoding from 'country-reverse-geocoding';
import Geocode from "react-geocode";
global.fetch = require("node-fetch");

import fs from 'fs';

import moment from 'moment';
import Firebase from "firebase";


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
const reverseGeocode = countryReverseGeoCoding.country_reverse_geocoding();
Geocode.setApiKey("AIzaSyBUvdk9G80gwkj9rxSPeXeKpFgaj9hlt70");


async function getLocations(){
    let locations = []
    return Firebase.database().ref('\location').once('value').then((snapshot) => {
      snapshot.forEach(child => {
        let id = child.val().latitude + "-" + child.val().longitude;
        let coordinates = [child.val().latitude, child.val().longitude]
        let city = child.val().city;
        const country = reverseGeocode.get_country(child.val().latitude, child.val().longitude);
        let value = 1;
        const obj = {
          id, city, countryName: country.name, coordinates, value
        }
        locations.push(obj)
      })
      // 
      // Some sort of algorithm to combine locations into larger fireballs.
      // 
      if (locations.length === 0) {
        console.log('No data fetched.  Skip writing to file...');
        return;
      }
      const data = {
        lastUpdated: moment().valueOf(),
        locations
      }
      console.log('Writing data to file...');
      fs.writeFile('./src/data/data.json', JSON.stringify(data, null, 2), (err) => {  
        if (err) {
          throw err;
        }
        console.log('Data file successfully saved!');
        process.exit();
      });
    });
}

// async function buildData() {
//     const locations = getLocations()
//     console.log("locations:" + locations)
// }

getLocations();