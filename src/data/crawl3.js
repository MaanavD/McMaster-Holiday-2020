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

const reverseGeocode = countryReverseGeoCoding.country_reverse_geocoding();

function sortNumericDescending(a, b) {
  return b.value - a.value;
}

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getTrends = async () => {
    let ref = Firebase.database().ref("/location");
    let trends = [];
    let itemsProcessed = 0;
    ref.on("value", snapshot => {
      let p = snapshot.val()
      
      console.log("size: " + p.size);
      Object.values(p).forEach(val => {
        var lat = val.latitude  
        var long = val.longitude
        itemsProcessed++;
        const country = reverseGeocode.get_country(lat, long);
        // const countryCode = ISO_3_TO_2[country?.code];
        Geocode.setApiKey("AIzaSyBUvdk9G80gwkj9rxSPeXeKpFgaj9hlt70");
        Geocode.fromLatLng(lat, long).then(
          response => {
            const address = response.results[0].formatted_address.split(',')[1].replace(/\s/g, '');
            if (address) {
              trends.push({
                id: `${lat}-${long}`,
                city: address,
                countryName: country.name,
                coordinates: [lat, long],
                value: 1
              });
            }
          }
        ).catch(err => {
          console.error("weewoo "+err);
        }).then((trends) => {
          if (itemsProcessed == Object.values(p).length){
            const data = {
              lastUpdated: moment().valueOf(),
              trends,
            };

            console.log('Writing data to file...');
            fs.writeFile('./src/data/data.json', JSON.stringify(data, null, 2), (err) => {
              if (err) {
                throw err;
              }
              console.log('Data file successfully saved!');
            });
          } 
        })
        
      });
      return trends
    })
  };


const buildData = async (test) => {
  const trends = await getTrends();
  console.log("trends:" + trends)
}

// function buildData(keyword) {
//   // getTrends().then(trends => {
//   //   console.log("trends:" + trends)
//   //   if (trends.length === 0) {
//   //     console.log('No data fetched.  Skip writing to file...');
//   //     return;
//   //   }
//   //   const data = {
//   //     lastUpdated: moment().valueOf(),
//   //     keyword,
//   //     trends,
//   //   };
  
//   //   console.log('Writing data to file...');
//   //   fs.writeFile('./src/data/data.json', JSON.stringify(data, null, 2), (err) => {
//   //     if (err) {
//   //       throw err;
//   //     }
//   //     console.log('Data file successfully saved!');
//   //   });
//   // }).catch(err => {
//   //   console.error("weewoo: "+err)
//   // })
//   getTrends()
//   console.log("trendsOut: " +trends)

//   // const data = {
//   //   lastUpdated: moment().valueOf(),
//   //   keyword,
//   //   trends,
//   // };

//   // console.log('Writing data to file...');
//   // fs.writeFile('./src/data/data.json', JSON.stringify(data, null, 2), (err) => {
//   //   if (err) {
//   //     throw err;
//   //   }
//   //   console.log('Data file successfully saved!');
//   // });
// }

buildData(cfgkeyword);
