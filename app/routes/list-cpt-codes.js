import Route from '@ember/routing/route';

export default class ListCptCodesRoute extends Route {
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
