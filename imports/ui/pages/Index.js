import _ from 'lodash';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import Checkbox from 'material-ui/Checkbox';

import { AsyncGoogleMap } from '../components/GoogleMap.js';
import FaSpinner from 'react-icons/lib/fa/spinner';

import { PlacesTable } from '../components/PlacesTable.js';

const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${Meteor.settings.public.googleMaps.apiKey}&libraries=places`;

const tableFields = ['type', 'name', 'description', 'address', 'city', 'county', 'contact_name', 'contact_number', 'accepting_refugees', 'accepting_pets', 'accepting_volunteers', 'accepting_supplies', 'updated_at', 'updated_by'];

const filterPlaces = (state) => {
  const { places, types, accepting_refugees, accepting_pets, accepting_supplies, accepting_volunteers } = state;
  return _.filter(places, place => {
      return ((accepting_refugees && place.accepting_refugees) || (accepting_pets && place.accepting_pets) ||
        (accepting_supplies && place.accepting_supplies) || (accepting_volunteers && place.accepting_volunteers)) && _.includes(types, place.type)
    });

}

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { places: [], types: ['shelter', 'need', 'muckedHome'], accepting_refugees: true, accepting_pets: true, accepting_supplies: true, accepting_volunteers: true };
  }

  componentDidMount() {
    Meteor.call('places.list', {}, (err, places) => this.setState({ places }));
  }

  toggleFilterType(event) {
    const { types } = this.state;
    const type = event.target.value;

    if (_.includes(types, type))
      this.setState({ types: _.without(types, type) });
    else
      this.setState({ types: [type].concat(types) });
  }

  render() {
    const { selected, types, accepting_refugees, accepting_pets, accepting_supplies, accepting_volunteers } = this.state;
    const places = filterPlaces(this.state);
    return (
      <div className="Index">
        <div className="checkbox-group">
          <span className="label">Type</span>
          <Checkbox value='shelter' checked={_.includes(types, 'shelter')} onCheck={this.toggleFilterType.bind(this)} label="Shelters" />
          <Checkbox value='need' checked={_.includes(types, 'need')} onCheck={this.toggleFilterType.bind(this)} label="Volunteering & Donation Drop-offs" />
          <Checkbox value='muckedHome' checked={_.includes(types, 'muckedHome')} onCheck={this.toggleFilterType.bind(this)} label="Muck Houses" />
        </div>
        <div className="checkbox-group">
          <span className="label">Accepting</span>
          <Checkbox checked={accepting_refugees} onCheck={() => this.setState({ accepting_refugees: !accepting_refugees })} label="Refugees" />
          <Checkbox checked={accepting_pets} onCheck={() => this.setState({ accepting_pets: !accepting_pets })} label="Pets" />
          <Checkbox checked={accepting_supplies} onCheck={() => this.setState({ accepting_supplies: !accepting_supplies })} label="Supplies" />
          <Checkbox checked={accepting_volunteers} onCheck={() => this.setState({ accepting_volunteers: !accepting_volunteers })} label="Volunteers" />
        </div>
        <AsyncGoogleMap
        googleMapURL={googleMapURL}
        loadingElement={
          <div style={{ height: `100%` }}>
            <FaSpinner
              style={{
                display: `block`,
                width: `80px`,
                height: `80px`,
                margin: `150px auto`,
                animation: `fa-spin 2s infinite linear`,
              }}
            />
          </div>
        }
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        onMapLoad={_.noop}
        onMapClick={_.noop}
        markers={_.map(places, (place, i) => ({onClick: () => this.setState({ selected: i }), showInfo: selected === i, info: { ...place }, position: {lat: place.lat, lng: place.lng}}))}
        onMarkerRightClick={_.noop}
        onMarkerClose={() => places[selected].showInfo = false}
      />

        <PlacesTable places={places} fields={tableFields} />
      </div>
    );
  }
}

export default Index;
