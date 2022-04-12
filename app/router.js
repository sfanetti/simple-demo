import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
    location = config.locationType;
    rootURL = config.rootURL;
}

export const ROUTES = [
    {
        route: 'pick-clinician',
        path: '/clinicians/',
        title: 'menu.clinician.head',
        details: 'menu.clinician.sub',
        isIndex: true
    },
    {
        route: 'pick-service',
        path: '/clinicians/:clinicianId/services/',
        title: 'menu.service.head',
        details: 'menu.service.sub',
        requires: ['clinicianId']
    },
    {
        route: 'pick-office',
        path: '/clinicians/:clinicianId/services/:cptCode/offices/',
        title: 'menu.office.head',
        details: 'menu.office.sub',
        requires: ['clinicianId', 'cptCode']
    },
    {
        route: 'pick-date-time',
        path: '/clinicians/:clinicianId/services/:cptCode/offices/:officeId/date-time/',
        title: 'menu.date_time.head',
        details: 'menu.date_time.sub',
        requires: ['clinicianId', 'cptCode', 'officeId']
    }
];


Router.map(function () {
    ROUTES.forEach(state => {
        const {route, path, isIndex} = state;
        this.route(route, { path });
        if (isIndex) {
            this.route('index', { path: '/' });
        }
    });

    this.route('error');
    this.route('loading');
    this.route('error-404', {path: '/404'});
});

Router.reopen({ location: 'hash' });
