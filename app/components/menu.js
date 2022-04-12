import Component from '@glimmer/component';

const STATES = [
    { type: 'PICK_CLINICIAN', url: 'schedule', title: 'Clinician', details:'Jimbob'},
    { type: 'PICK_PROCEDURE', url: 'services', title: 'Serivce', details:'Free Consult' },
    { type: 'PICK_OFFICE', url: 'offices', title: 'Select a Location', details:'Pick '}

];

export default class MenuComponent extends Component {
    states = STATES;
}
