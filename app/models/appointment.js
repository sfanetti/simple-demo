import Model, { attr } from '@ember-data/model';

export default class AppointmentModel extends Model {
    @attr('string')
    cptCodeId;

    @attr('string')
    officeId;

    @attr('string')
    dateTime;
}
