import Component from '@glimmer/component';
import { inject } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


export default class ClinicianComponent extends Component {
    @inject session;
    @inject router;
    @inject fakeBackend;

    @tracked isFakeBackend;
    @tracked fakeClinician;

    get fakeTooltipKey () {
        return this.isFakeBackend ? 'tooltips.goBack' : 'tooltips.useFake';
    }

    get fakeClinicianName () {
        return this.fakeClinician ? this.fakeClinician.name : '';
    }

    @action
    onSelectFakeClinician(clinician) {
        const { id } = clinician;
        this.session.clinicianId = id;
        this.session.currentHost = 'fake_host';
        this.fakeClinician = clinician;
        this.isFakeBackend = false;
    }

    @action
    onSelectClinician() {
        this.router.transitionTo('pick-service', this.session.clinicianId);
        this.session.persistLastHost();
    }

    @action
    onToggleShowFake() {
        this.isFakeBackend = !this.isFakeBackend;
    }
    @action
    onResetToDefaults() {
        this.session.resetToDefaults();
        this.fakeBackend.reset();
    }


}
