import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
    location = config.locationType;
    rootURL = config.rootURL;
}

export const ROUTES = [
    {
        route: 'pick-clinician', base: 'clinicians', title: 'Choose Clinician',
        details: 'Enter Clinician ID and Host URL in the area provided', isIndex: true
    },
    {
        route: 'pick-service', base: 'services', params: ':clinician_id', title: 'Choose Service',
        details: 'Services can be online or in person',
        requires: ['clinicianId', 'currentHost']
    },
    {
        route: 'pick-office', base: 'offices', params: ':clinician_id', title: 'Choose Location',
        details: 'Office visits may be subject to restrictions',
        requires: ['clinicianId', 'currentHost', 'cptCode']
    },
    {
        route: 'pick-date-time', base: 'dates', params: ':clinician_id', title: 'Choose Date',
        details: 'Got no API for this part :)',
        requires: ['clinicianId', 'currentHost', 'cptCode', 'officeId']
    }
];


Router.map(function () {
  ROUTES.forEach(state => {
      const {route, base, params, isIndex} = state;
      const path = `/${base}/${params || ''}`;
      this.route(route, {path});
      if (isIndex) {
          const path = '/';
          this.route(route, {path});
      }
  });
  this.route('error');
  this.route('loading');
  this.route('error-404', {path: '/404'});
});
