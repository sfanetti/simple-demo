import Model, { attr, belongsTo } from '@ember-data/model';

/**
 * Simplified cpt codes model
 */
export default class CptCodeModel extends Model {
    @attr('string')
    description;

    @attr('number')
    duration;

    @attr('number')
    rate;

    @attr('boolean')
    callToBook;

    @attr('array')
    links;

    @belongsTo('clinician')
    clinician;
}
