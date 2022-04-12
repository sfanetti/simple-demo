import Base from './base';

export default class PickDateTimeRoute extends Base {
    takeParamsTemplate(params) {
        const { officeId, cptCode, clinicianId } = params;
        return { officeId, cptCode, clinicianId };
    }

    async model (params) {
        return await this.modelTemplate('', params);
    }
}
