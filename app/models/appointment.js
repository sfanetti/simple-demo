import Model, { attr } from '@ember-data/model';

/**
 * Simple appointment model - would be populated on the last step of the wizard
 */
export default class AppointmentModel extends Model {
    @attr('string')
    cptCodeId;

    @attr('string')
    officeId;

    @attr('string')
    dateTime;
}
