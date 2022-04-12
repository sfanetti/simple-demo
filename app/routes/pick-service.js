import Base from './base';

export default class ListCptCodesRoute extends Base {
    takeParamsTemplate(params) {
        const { cptCode, clinicianId } = params;
        return { cptCode, clinicianId };
    }
    async model (params) {
        return await this.modelTemplate('cpt-code', params);
    }
}
