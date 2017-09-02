import _ from 'lodash';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { HTTP } from 'meteor/http';
import rateLimit from '../../modules/rate-limit.js';

export const listPlaces = new ValidatedMethod({
  name: 'places.list',
  validate: new SimpleSchema({
    lat: { type: Number, optional: true },
    lng: { type: Number, optional: true },
  }).validator(),
  run(position) {
    this.unblock();
    const needsResult = HTTP.get('https://api.harveyneeds.org/api/v1/needs', {
      params: {}
    });
    const sheltersResults = HTTP.get('https://api.harveyneeds.org/api/v1/shelters', {
      params: {}
    });
    const muckMapResults = HTTP.post('https://cardforge.herokuapp.com/parse/classes/GPSMarkerObject', {
      data: {"where":{ "type": "muckedHome" },"limit":5000,"order":"-updatedAt","_method":"GET","_ApplicationId":"cardforgegame","_JavaScriptKey":"brian","_ClientVersion":"js1.9.2","_InstallationId":"119bf705-6884-48b2-d21b-a530d5e53845"}
    });
    const needs = _.map(needsResult.data.needs, need => ({
      type: 'need',
      updatedBy: need.update_by,
      updatedAt: need.updatedAt,
      name: need.location_name,
      description: need.anything_else_you_would_like_to_tell_us,
      address: need.location_address,
      city: '',
      county: '',
      lng: need.longitude,
      lat: need.latitude,
      contact_name: need.contact_for_this_location_name,
      contact_number: need.contact_for_this_location_phone_number,
      accepting_refugees: false,
      accepting_pets: false,
      accepting_volunteers: need.are_volunteers_needed,
      volunteer_needs: _.split(need.tell_us_about_the_volunteer_needs, ','),
      accepting_supplies: need.are_supplies_needed,
      supply_needs: _.split(need.tell_us_about_the_supply_needs, ','),
    }));
    const shelters = _.map(sheltersResults.data.shelters, shelter => ({
      type: 'shelter',
      updatedBy: shelter.updated_by,
      updatedAt: shelter.updatedAt,
      name: shelter.shelter,
      description: shelter.notes,
      address: shelter.address,
      city: shelter.city,
      county: shelter.county,
      lng: shelter.longitude,
      lat: shelter.latitude,
      contact_name: shelter.contact_for_this_location_name,
      contact_number: shelter.phone,
      accepting_refugees: shelter.accepting,
      accepting_pets: shelter.pets === 'Yes',
      accepting_volunteers: shelter.volunteer_needs !== '',
      volunteer_needs: _.split(shelter.volunteer_needs, ','),
      accepting_supplies: shelter.are_supplies_needed !== '',
      supply_needs: _.split(shelter.supply_needs, ','),
    }));
    const muckMap = _.map(muckMapResults.data.results, muck => ({
      type: muck.type,
      updatedBy: muck.name,
      updatedAt: muck.updatedAt,
      name: 'Volunteer Help Needed',
      description: muck.description,
      address: muck.address,
      city: '',
      county: '',
      lng: muck.positionData.lng,
      lat: muck.positionData.lat,
      contact_name: muck.name,
      contact_number: muck.phone,
      accepting_refugees: false,
      accepting_pets: false,
      accepting_volunteers: true,
      volunteer_needs: [],
      accepting_supplies: false,
      supply_needs: [],
    }));

    return [].concat(needs, shelters, muckMap);
  },
});

rateLimit({
  methods: [
    listPlaces,
  ],
  limit: 5,
  timeRange: 1000,
});
