import React from 'react';

import { useStateValue } from '../state';
import Button from './button';
import Fade from './fade';

// function getSearchUrl(city, country, keyword) {
//   const formattedQuery = `${encodeURIComponent(city)}, ${encodeURIComponent(
//     country,
//   )} ${encodeURIComponent(keyword)}`.replace(/(%20| )/g, '+');
//   return `https://www.google.com/search?q=${formattedQuery}`;
// }

export function getRandomMarker({ focusedMarker, markers }) {
  const filteredMarkers = markers.filter((marker) => {
    return marker.id !== focusedMarker?.id;
  });
  return filteredMarkers[Math.floor(Math.random() * filteredMarkers.length)];
}

export default function Details() {
  const [
    { focusedMarker, markers},
    dispatch,
  ] = useStateValue();
  const randomMarker = getRandomMarker({ focusedMarker, markers });

  let content;
  if (focusedMarker) {
    const { city, countryName, value } = focusedMarker;
    const url = "https://mcmasterengineering.capsule.video/";

    content = (
      <>
        <div className="header">
          <Button
            label="Back to globe"
            onClick={() => dispatch({ type: 'FOCUS' })}
          />
          <Button
            label="Random City"
            onClick={() => dispatch({ type: 'FOCUS', payload: randomMarker })}
          />
        </div>
        <div className="content">
          <h2>
            {city}, {countryName} ({value})
          </h2>
          <div className="details-content">
          </div>
          <Button
            label="View Mac Eng on Capsule"
            onClick={() => window.open(url, '_blank')}
          />
        </div>
      </>
    );
  }

  return (
    <Fade className="details" show={focusedMarker}>
      {content}
    </Fade>
  );
}
