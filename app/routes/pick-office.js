import Base from './base';

export default class ListOfficesRoute extends Base {
    async model (params) {
        const result = await this.store.query('office', params);
        const offices = result.content.map(resultItem => resultItem.getRecord());
        const { clinician_id } = params;
        return {
            clinicianId: clinician_id,
            offices
        }
    }
}
