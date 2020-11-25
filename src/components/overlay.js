import moment from 'moment';
import React, { useState } from 'react';

import { useStateValue } from '../state';
import About from './about';
import Description from './description';
import Fade from './fade';
import Link from './link';
import YouTube from 'react-youtube';

export default function Overlay() {
  const [
    { focusedMarker, lastUpdated, markers, start },
    dispatch,
  ] = useStateValue();
  const [showAbout, setShowAbout] = useState(false);

  const showOverlay = start && !showAbout && !focusedMarker;
  const opts = {
    height: '500',
    width: '720',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  
  return (
    <>
      <About onHide={() => setShowAbout(false)} show={showAbout} />
      <Fade className="overlay" show={showOverlay}>
        <div className="header">
          <div>
            <h2>McMaster Holiday Map</h2>
            <div className="overlay-subtitle">
              <Description />
            </div>
          </div>
          <div>
            <Link className="nudge-right" onClick={() => setShowAbout(true)}>
              About
            </Link>
            <Link link="GITHUB_REPO">Github</Link>
          </div>
        </div>
        <div className="content">
          Intro Video
          <YouTube videoId="2g811Eo7K8U" opts={opts} onReady={event => event.target.pauseVideo()}/>
          
        </div>
        <div className="footer">
          Updated on {moment(lastUpdated).format('MMM D, YYYY')}
        </div>
      </Fade>
    </>
    
  );
  
}
