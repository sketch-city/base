import { Meteor } from 'meteor/meteor';
import React from 'react';

import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import SearchBox from 'react-google-maps/lib/places/SearchBox';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";

import { MarkerInfo } from './MarkerInfo.js';

const INPUT_STYLE = {
  boxSizing: 'border-box',
  MozBoxSizing: 'border-box',
  border: '1px solid transparent',
  width: '240px',
  height: '32px',
  marginTop: '12px',
  padding: '0 12px',
  borderRadius: '1px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  fontSize: '14px',
  outline: 'none',
  textOverflow: 'ellipses',
};

export const SyncGoogleMap = withGoogleMap(
  props => (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={9}
      defaultCenter={{ lat: 29.7615527, lng: -95.3615587 }}
      onClick={props.onMapClick}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
        inputPlaceholder="Search"
        inputStyle={INPUT_STYLE}
      />
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
