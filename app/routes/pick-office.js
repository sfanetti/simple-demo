import Base from './base';

export default class ListOfficesRoute extends Base {
    takeParamsTemplate(params) {
        const { officeId, clinicianId } = params;
        return { officeId, clinicianId };
    }
    async model (params) {
        return await this.modelTemplate('office', params);
    }
}
