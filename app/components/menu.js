import Component from '@glimmer/component';
import { computed } from '@ember/object';

const STATES = [
    { type: 'PICK_CLINICIAN', url: 'schedule', title: 'Clinician', details:'Samantha Jones MD'},
    { type: 'PICK_PROCEDURE', url: 'services', title: 'Service', details:'Choose Service' },
    { type: 'PICK_OFFICE', url: 'offices', title: 'Select a Location', details:'Choose Time and Location'}

];

export default class MenuComponent extends Component {
    @computed('location.href')
    get states() {
        const href = window.location.href;
        return STATES.map(state => {
            const { url } = state;
            const isActive = href.indexOf(url) !== -1;
            return {...state, isActive};
        });
    }
}
