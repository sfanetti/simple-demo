import Component from '@glimmer/component';
import { inject } from '@ember/service';
import { action } from '@ember/object';


export default class ClinicianComponent extends Component {
    @inject session;
    @inject router;

    @action
    onSelectClinician() {
        this.router.transitionTo('pick-service', this.session.clinicianId);
    }
}
