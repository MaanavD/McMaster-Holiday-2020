  import moment from 'moment';
  import React, { useState } from 'react';

  import { useStateValue } from '../state';
  import About from './about';
  import Description from './description';
  import Fade from './fade';
  import Link from './link';
  import Button from './button';

  import YouTube from 'react-youtube';

  export default function Overlay() {
    const [
      // { focusedMarker, lastUpdated, markers, start },
      // dispatch,
      { focusedMarker, lastUpdated, start },
      ,
    ] = useStateValue();
    const [showAbout, setShowAbout] = useState(false);

    const showOverlay = start && !showAbout && !focusedMarker;
    const opts = {
      height: '500',
      width: '600',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    

    let cElement = null;
    const _onReady = event => {
      cElement = event;
      event.target.pauseVideo();
    };

    const handleClickPlay= () => {
      cElement.target.playVideo()
    }

    const handleClickPause= () => {
      cElement.target.pauseVideo()
    }

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
            <h2>Intro Video</h2>
            
              <YouTube id="video" videoId="2g811Eo7K8U" opts={opts} onReady={_onReady}/>
            <div className="buttons">
              <Button className="button" label="Play" onClick={handleClickPlay}></Button>
              <Button className="button" label="Pause" onClick={handleClickPause}></Button>
            </div>
            
          </div>
          <div className="footer">
            Updated on {moment(lastUpdated).format('MMM D, YYYY')}
          </div>
        </Fade>
      </>
      
    );
    
  }
