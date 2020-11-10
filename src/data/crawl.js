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
const ISO_3_TO_2 = {
  AFG: 'AF',
  ALA: 'AX',
  ALB: 'AL',
  DZA: 'DZ',
  ASM: 'AS',
  AND: 'AD',
  AGO: 'AO',
  AIA: 'AI',
  ATA: 'AQ',
  ATG: 'AG',
  ARG: 'AR',
  ARM: 'AM',
  ABW: 'AW',
  AUS: 'AU',
  AUT: 'AT',
  AZE: 'AZ',
  BHS: 'BS',
  BHR: 'BH',
  BGD: 'BD',
  BRB: 'BB',
  BLR: 'BY',
  BEL: 'BE',
  BLZ: 'BZ',
  BEN: 'BJ',
  BMU: 'BM',
  BTN: 'BT',
  BOL: 'BO',
  BIH: 'BA',
  BWA: 'BW',
  BVT: 'BV',
  BRA: 'BR',
  VGB: 'VG',
  IOT: 'IO',
  BRN: 'BN',
  BGR: 'BG',
  BFA: 'BF',
  BDI: 'BI',
  KHM: 'KH',
  CMR: 'CM',
  CAN: 'CA',
  CPV: 'CV',
  CYM: 'KY',
  CAF: 'CF',
  TCD: 'TD',
  CHL: 'CL',
  CHN: 'CN',
  HKG: 'HK',
  MAC: 'MO',
  CXR: 'CX',
  CCK: 'CC',
  COL: 'CO',
  COM: 'KM',
  COG: 'CG',
  COD: 'CD',
  COK: 'CK',
  CRI: 'CR',
  CIV: 'CI',
  HRV: 'HR',
  CUB: 'CU',
  CYP: 'CY',
  CZE: 'CZ',
  DNK: 'DK',
  DJI: 'DJ',
  DMA: 'DM',
  DOM: 'DO',
  ECU: 'EC',
  EGY: 'EG',
  SLV: 'SV',
  GNQ: 'GQ',
  ERI: 'ER',
  EST: 'EE',
  ETH: 'ET',
  FLK: 'FK',
  FRO: 'FO',
  FJI: 'FJ',
  FIN: 'FI',
  FRA: 'FR',
  GUF: 'GF',
  PYF: 'PF',
  ATF: 'TF',
  GAB: 'GA',
  GMB: 'GM',
  GEO: 'GE',
  DEU: 'DE',
  GHA: 'GH',
  GIB: 'GI',
  GRC: 'GR',
  GRL: 'GL',
  GRD: 'GD',
  GLP: 'GP',
  GUM: 'GU',
  GTM: 'GT',
  GGY: 'GG',
  GIN: 'GN',
  GNB: 'GW',
  GUY: 'GY',
  HTI: 'HT',
  HMD: 'HM',
  VAT: 'VA',
  HND: 'HN',
  HUN: 'HU',
  ISL: 'IS',
  IND: 'IN',
  IDN: 'ID',
  IRN: 'IR',
  IRQ: 'IQ',
  IRL: 'IE',
  IMN: 'IM',
  ISR: 'IL',
  ITA: 'IT',
  JAM: 'JM',
  JPN: 'JP',
  JEY: 'JE',
  JOR: 'JO',
  KAZ: 'KZ',
  KEN: 'KE',
  KIR: 'KI',
  PRK: 'KP',
  KOR: 'KR',
  KWT: 'KW',
  KGZ: 'KG',
  LAO: 'LA',
  LVA: 'LV',
  LBN: 'LB',
  LSO: 'LS',
  LBR: 'LR',
  LBY: 'LY',
  LIE: 'LI',
  LTU: 'LT',
  LUX: 'LU',
  MKD: 'MK',
  MDG: 'MG',
  MWI: 'MW',
  MYS: 'MY',
  MDV: 'MV',
  MLI: 'ML',
  MLT: 'MT',
  MHL: 'MH',
  MTQ: 'MQ',
  MRT: 'MR',
  MUS: 'MU',
  MYT: 'YT',
  MEX: 'MX',
  FSM: 'FM',
  MDA: 'MD',
  MCO: 'MC',
  MNG: 'MN',
  MNE: 'ME',
  MSR: 'MS',
  MAR: 'MA',
  MOZ: 'MZ',
  MMR: 'MM',
  NAM: 'NA',
  NRU: 'NR',
  NPL: 'NP',
  NLD: 'NL',
  ANT: 'AN',
  NCL: 'NC',
  NZL: 'NZ',
  NIC: 'NI',
  NER: 'NE',
  NGA: 'NG',
  NIU: 'NU',
  NFK: 'NF',
  MNP: 'MP',
  NOR: 'NO',
  OMN: 'OM',
  PAK: 'PK',
  PLW: 'PW',
  PSE: 'PS',
  PAN: 'PA',
  PNG: 'PG',
  PRY: 'PY',
  PER: 'PE',
  PHL: 'PH',
  PCN: 'PN',
  POL: 'PL',
  PRT: 'PT',
  PRI: 'PR',
  QAT: 'QA',
  REU: 'RE',
  ROU: 'RO',
  RUS: 'RU',
  RWA: 'RW',
  BLM: 'BL',
  SHN: 'SH',
  KNA: 'KN',
  LCA: 'LC',
  MAF: 'MF',
  SPM: 'PM',
  VCT: 'VC',
  WSM: 'WS',
  SMR: 'SM',
  STP: 'ST',
  SAU: 'SA',
  SEN: 'SN',
  SRB: 'RS',
  SYC: 'SC',
  SLE: 'SL',
  SGP: 'SG',
  SVK: 'SK',
  SVN: 'SI',
  SLB: 'SB',
  SOM: 'SO',
  ZAF: 'ZA',
  SGS: 'GS',
  SSD: 'SS',
  ESP: 'ES',
  LKA: 'LK',
  SDN: 'SD',
  SUR: 'SR',
  SJM: 'SJ',
  SWZ: 'SZ',
  SWE: 'SE',
  CHE: 'CH',
  SYR: 'SY',
  TWN: 'TW',
  TJK: 'TJ',
  TZA: 'TZ',
  THA: 'TH',
  TLS: 'TL',
  TGO: 'TG',
  TKL: 'TK',
  TON: 'TO',
  TTO: 'TT',
  TUN: 'TN',
  TUR: 'TR',
  TKM: 'TM',
  TCA: 'TC',
  TUV: 'TV',
  UGA: 'UG',
  UKR: 'UA',
  ARE: 'AE',
  GBR: 'GB',
  USA: 'US',
  UMI: 'UM',
  URY: 'UY',
  UZB: 'UZ',
  VUT: 'VU',
  VEN: 'VE',
  VNM: 'VN',
  VIR: 'VI',
  WLF: 'WF',
  ESH: 'EH',
  YEM: 'YE',
  ZMB: 'ZM',
  ZWE: 'ZW',
};

const reverseGeocode = countryReverseGeoCoding.country_reverse_geocoding();

// function getUserData() {
//   let ref = Firebase.database().ref("/location");
//   ref.on("value", snapshot => {
//     let p = snapshot.val()
//     Object.values(p).forEach(val => {
//       const trends = [];
//       var lat = val.latitude
//       var long = val.longitude
//       const country = reverseGeocode.get_country(lat, long);
//       const countryCode = ISO_3_TO_2[country?.code];
//       Geocode.setApiKey("AIzaSyBUvdk9G80gwkj9rxSPeXeKpFgaj9hlt70");
//       Geocode.fromLatLng(lat, long).then(
//         response => {
//           const address = response.results[0].formatted_address;
//           console.log(address);
//         },
//         error => {
//           console.error("weewoo"+error);
//         }
//       );
//       console.log(lat, long, country.name, countryCode)

//       // if (countryCode) {
//       //   trends.push({
//       //     id: `${lat}-${long}`,
//       //     city: geoName,
//       //     countryCode,
//       //     countryName: country.name,
//       //     coordinates: [lat, long],
//       //     value: 1
//       //   });
//       // }

//       // console.log(trends)
//     });
//   });
//   return trends
// };




function sortNumericDescending(a, b) {
  return b.value - a.value;
}

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getRelatedTopics({ keyword, geo }) {
  console.log(`Getting related topics for "${keyword}" in "${geo}"`);
  return googleTrends
    .relatedTopics({ keyword, geo })
    .then((response) => {
      let relatedTopics = [];
      const rankedList = JSON.parse(response)?.default?.rankedList[0]
        ?.rankedKeyword;
      if (rankedList) {
        relatedTopics = rankedList
          .map((d) => ({
            link: d.link,
            topic: d.topic.title,
            value: d.value,
          }))
          .sort(sortNumericDescending)
          .slice(0, 10);
      }
      return relatedTopics;
    })
    .catch(console.error);
}

async function getTrends({ keyword }) {
  // return getUserData()
  console.log(`Getting trends for "${keyword}" `);
  return googleTrends
    .interestByRegion({
      keyword,
      resolution: 'city',
    })
    .then((response) => {
      const trends = [];
      const geoMapData = JSON.parse(response)?.default?.geoMapData;
      if (geoMapData) {
        geoMapData.forEach((d) => {
          const { coordinates, geoName, value } = d;
          const { lat, lng } = coordinates;
          const country = reverseGeocode.get_country(lat, lng);
          const countryCode = ISO_3_TO_2[country?.code];
          if (countryCode) {
            trends.push({
              id: `${lat}-${lng}`,
              city: geoName,
              countryCode,
              countryName: country.name,
              coordinates: [lat, lng],
              value: value[0],
            });
          }
        });
      }
      return trends.sort(sortNumericDescending);
    })
    .catch(console.error);
}

async function buildData(keyword) {
  const trends = await getTrends({ keyword });

  const relatedTopics = {};
  for (const trend of trends) {
    const { countryCode } = trend;
    if (countryCode && !relatedTopics[countryCode]) {
      await wait(500); // wait/throttle 500ms
      relatedTopics[countryCode] = await getRelatedTopics({
        keyword,
        geo: countryCode,
      });
    }
  }

  if (trends.length === 0) {
    console.log('No data fetched.  Skip writing to file...');
    return;
  }

  const data = {
    lastUpdated: moment().valueOf(),
    keyword,
    relatedTopics,
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

buildData(cfgkeyword);
