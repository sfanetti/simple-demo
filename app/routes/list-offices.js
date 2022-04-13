import Route from '@ember/routing/route';

export default class ListOfficesRoute extends Route {
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
