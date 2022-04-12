import Route from '@ember/routing/route';

export default class ListCptCodesRoute extends Route {
    async model (params) {
        debugger;
        return await this.store.query('cpt-code', params);
    }
}
