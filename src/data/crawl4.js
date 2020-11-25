import countryReverseGeoCoding from 'country-reverse-geocoding';
import Geocode from "react-geocode";
global.fetch = require("node-fetch");

import fs from 'fs';
import googleTrends from 'google-trends-api';

import moment from 'moment';
import Firebase from "firebase";

let cfgkeyword = "mcmaster"
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
let ref = Firebase.database().ref("/location");
let trends = []
const reverseGeocode = countryReverseGeoCoding.country_reverse_geocoding();
Geocode.setApiKey("AIzaSyBUvdk9G80gwkj9rxSPeXeKpFgaj9hlt70");
function sortNumericDescending(a, b) {
    return b.value - a.value;
  }
  
  async function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const getLocations = async () => {
    // ref.on("value", (snapshot) => {

    // }, err => {
    //     console.error(err)
    // })
    Firebase.database().ref('\location').on('value', (snapshot) => {
        snapshot.forEach((child) => {
            let lat = child.val().latitude;
            let long = child.val().longitude;
            const country = reverseGeocode.get_country(lat, long);
            Geocode.fromLatLng(lat, long).then(res => {
                let address = res.results[0].formatted_address.split(',')[1].replace(/\s/g, '');
                trends.push(lat, long, country.name, address)
            })
          });
      })
}

getLocations().then(() => console.log("trend"))