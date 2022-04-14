import Base from './base';

export default class ListCptCodesRoute extends Base {
    async model (params) {
        const result = await this.store.query('cpt-code', params);
        const codes = result.content.map(resultItem => resultItem.getRecord());
        const { clinician_id } = params;
        return {
            clinicianId: clinician_id,
            codes
        }
    }
}
