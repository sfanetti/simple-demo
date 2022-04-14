import Component from '@glimmer/component';
import { inject } from '@ember/service';

export default class ClinicianComponent extends Component {
    @inject session;
}
