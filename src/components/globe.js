import React, { useEffect, useState } from 'react';
import ReactGlobe, { tween } from 'react-globe';
import * as THREE from 'three';
import { SVGLoader }  from "three/examples/jsm/loaders/SVGLoader";

import { useStateValue } from '../state';
import Fade from './fade';
import fireball from './Fireball.svg';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const MARKER_COLOR = '#7A003C';
const MARKER_COMPANION_COLOR = '#fff9e6';

function random(scaleFactor) {
  return Math.random() > 0.5
    ? scaleFactor * Math.random()
    : -scaleFactor * Math.random();
}

const randomMaterial = () => {
  const val = Math.floor(Math.random() * (6));
  switch(val){
    case(0):
      return new THREE.MeshBasicMaterial( {
        color: "#7A003C",
        side: THREE.DoubleSide,
      });
    case(1):
      return new THREE.MeshBasicMaterial( {
        color: "#FDBF57",
        side: THREE.DoubleSide,
      });
    case(2):
      return new THREE.MeshBasicMaterial( {
        color: "#5E6A71",
        side: THREE.DoubleSide,
      });
    case(3): 
      return new THREE.MeshBasicMaterial( {
        color: "#D2D755",
        side: THREE.DoubleSide,
      });
    case(4): 
      return new THREE.MeshBasicMaterial( {
        color: "#8BD3E6",
        side: THREE.DoubleSide,
      });
    case(5):
      return new THREE.MeshBasicMaterial( {
        color: "#FFD100",
        side: THREE.DoubleSide,
      });
  }
}

function markerRenderer(marker) {
  // instantiate a loader
  const value = marker.value == 0? 0.35 : marker.value * 0.1
  // const value = marker.value
  const svgMarkup = document.querySelectorAll('svg')[0].outerHTML;
  const svgHoles = document.querySelectorAll('svg')[1].outerHTML;
  const loader = new SVGLoader();
  const svgData = loader.parse(svgMarkup);
  const dataHoles = loader.parse(svgHoles);
  
  // Group that will contain all of our paths
  const svgGroup = new THREE.Group();
  svgGroup.scale.y *= -1;
  svgGroup.scale.x *= -1;
  svgGroup.scale.x *= (value > 2 ? 2: value)
  svgGroup.scale.y *= (value > 2 ? 2 : value)
  const material = randomMaterial();
  // material.color: 
    // wireframe: true
  
  // Loop through all of the parsed paths
  svgData.paths.forEach((path, i) => {
    
    const shapes = path.toShapes(true);
    // Each path has array of shapes
    shapes.forEach((shape) => {
      // Finally we can take each shape and extrude it
      // const geometry = new THREE.Geometry(shape);
      console.log(dataHoles);
      dataHoles.paths.forEach(hole => {
        const holes = hole.toShapes(true);
        holes.forEach(h => {
          shape.holes.push(h)
        })
      })
      console.log(shape.holes)
      // Create a mesh and add it to the group
      const geometry = new THREE.ExtrudeGeometry(shape, {depth: 5, bevelEnabled: false});
      const mesh = new THREE.Mesh(geometry, material);
      
      svgGroup.add(mesh);
    });
  });
  
  // Add our group to the scene (you'll need to create a scene)
  // scene.add(svgGroup);

  // const companions = [];
  // for (let i = 0; i < 10; i++) {
  //   const companionGeometry = new THREE.SphereGeometry(
  //     Math.min((size * Math.random()) / 2, 1),
  //     10,
  //     10,
  //   );
  //   const companionMaterial = new THREE.MeshBasicMaterial({
  //     color: new THREE.Color(MARKER_COMPANION_COLOR),
  //   });
  //   const companion = new THREE.Mesh(companionGeometry, companionMaterial);
  //   companion.lookAt(new THREE.Vector3(0, 0, 0));
  //   companions.push(companion);
  //   mesh.add(companion);
  // }

  // companions.forEach((companion, i) => {
  //   function animate() {
  //     const from = {
  //       opacity: 0.1,
  //       position: companion.position.clone().toArray(),
  //       scale: Math.max(0.5, Math.random()),
  //     };
  //     const to = {
  //       opacity: 0.5,
  //       position: [random(size * 3), random(size * 3), random(size)],
  //       scale: 0.01,
  //     };
  //     tween({
  //       from,
  //       to,
  //       animationDuration: 4000,
  //       easingFunction: ['Quadratic', 'InOut'],
  //       onUpdate: () => {
  //         const [x, y, z] = from.position;
  //         const companionMaterial = companion.material;
  //         const intensityChange = random(0.05);
  //         if (
  //           light.intensity + intensityChange > 0 &&
  //           light.intensity + intensityChange < 1.5
  //         ) {
  //           light.intensity += intensityChange;
  //         }
  //         companionMaterial.opacity = from.opacity;
  //         companion.scale.x = from.scale;
  //         companion.scale.y = from.scale;
  //         companion.scale.z = from.scale;
  //         companion.position.set(x, y, z);
  //       },
  //       onEnd: animate,
  //       delay: i * 200,
  //     });
  //   }
  //   animate();
  // });
  return svgGroup;
}

export default function Globe() {
  const [
    hasGlobeBackgroundTextureLoaded,
    setHasGlobeBackgroundTextureLoaded,
  ] = useState(false);
  const [
    hasGlobeCloudsTextureLoaded,
    setHasGlobeCloudsTextureLoaded,
  ] = useState(false);
  const [hasGlobeTextureLoaded, setHasGlobeTextureLoaded] = useState(false);
  const [
    { config, focusedMarker, hasLoaded, markers, start },
    dispatch,
  ] = useStateValue();

  useEffect(() => {
    if (
      hasGlobeBackgroundTextureLoaded &&
      hasGlobeCloudsTextureLoaded &&
      hasGlobeTextureLoaded
    ) {
      dispatch({ type: 'LOADED' });
    }
  }, [
    dispatch,
    hasGlobeBackgroundTextureLoaded,
    hasGlobeCloudsTextureLoaded,
    hasGlobeTextureLoaded,
  ]);

  const { globeBackgroundTexture, globeCloudsTexture, globeTexture } = config;

  const isFocusing = focusedMarker;

  const options = {
    ...config.options,
    enableGlobeGlow: !isFocusing,
    enableCameraRotate: start && !isFocusing,
    markerTooltipRenderer: (marker) => `${marker.city} (${marker.value})`,
    markerRenderer,
  };

  return (
    <>
      <div className={hasLoaded ? undefined : 'hidden'}>
        <ReactGlobe
          globeBackgroundTexture={globeBackgroundTexture}
          globeCloudsTexture={globeCloudsTexture}
          globeTexture={globeTexture}
          height="100vh"
          focus={focusedMarker?.coordinates}
          markers={start ? markers : []}
          width="100vw"
          options={options}
          onClickMarker={(marker) => {
            dispatch({ type: 'FOCUS', payload: marker });
          }}
          onGlobeTextureLoaded={() => setHasGlobeTextureLoaded(true)}
          onGlobeBackgroundTextureLoaded={() =>
            setHasGlobeBackgroundTextureLoaded(true)
          }
          onGlobeCloudsTextureLoaded={() =>
            setHasGlobeCloudsTextureLoaded(true)
          }
        />
      </div>
      <Fade animationDuration={3000} className="cover" show={!hasLoaded} />
    </>
  );
}
