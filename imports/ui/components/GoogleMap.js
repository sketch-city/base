import { Meteor } from 'meteor/meteor';
import React from 'react';

import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";

import { MarkerInfo } from './MarkerInfo.js';

export const SyncGoogleMap = withGoogleMap(
  props => (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={9}
      defaultCenter={{ lat: 29.7615527, lng: -95.3615587 }}
      onClick={props.onMapClick}
    >
      {props.markers.map((marker, index) => (
        <Marker key={index}
          {...marker}
          onRightClick={() => props.onMarkerRightClick(marker)}
        >
        {/*
          Show info window only if the 'showInfo' key of the marker is true.
          That is, when the Marker pin has been clicked and 'onCloseClick' has been
          Successfully fired.
        */}
        {marker.showInfo && (
          <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
            <MarkerInfo {...marker.info} />
          </InfoWindow>
        )}
        </Marker>
      ))}
    </GoogleMap>
  )
);

// Wrap all `react-google-maps` components with `withGoogleMap` HOC
// then wraps it into `withScriptjs` HOC
// It loads Google Maps JavaScript API v3 for you asynchronously.
// Name the component AsyncGettingStartedExampleGoogleMap
export const AsyncGoogleMap = withScriptjs(SyncGoogleMap);
