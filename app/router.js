import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('scheduler', { path: '/schedule'});
  this.route('list-cpt-codes', { path: '/services/:clinician_id'});
  this.route('list-offices', { path: '/offices/:clinician_id'});
});
