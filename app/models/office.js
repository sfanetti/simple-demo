import Model, { attr, belongsTo } from '@ember-data/model';

/**
 * Simplified Office Model
 */
export default class OfficeModel extends Model {
    @attr('string')
    name;

    @attr('string')
    phone;

    @attr('boolean')
    isVideo;

    @attr()
    geolocation;

    @attr('boolean')
    isPublic;

    @attr()
    links;

    @belongsTo('clinician')
    clinician;
}
