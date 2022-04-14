import Model, { attr, hasMany } from '@ember-data/model';

/**
 * Simple clinician model - Figured I needed something to tie the clinicianId to
 */
export default class ClinicianModel extends Model {
    @attr('string')
    firstName;

    @attr('string')
    surName;

    @attr('string')
    specialty;

    @attr('array')
    availableCptCodes;

    @hasMany('office')
    offices;

    @hasMany('cpt-code')
    cptCodes;
}
