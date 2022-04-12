import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { debounce } from '@ember/runloop';
import ResponseUtils from '../util/response-utils';


export default class BaseController extends Controller {
    async loadPage(params) {
        const { data, meta, clinicianId, nextPage, pageSize } = params;
        const query = {
            clinicianId,
            page: {
                number: nextPage,
                size: pageSize
            }
        };
        const typeForModel = this.typeForModel;
        try {
            const response = await this.store.query(typeForModel, query);
            const { data: newData, meta: newMeta } = ResponseUtils.processResponse(response, params);

            meta.first = newMeta.first;
            meta.last = newMeta.last;
            set(this.model, 'data', [...data, ...newData]);
            set(this.model, 'meta', {...meta});

        } catch(e) {
            // ignore these
        }
    }


    @action
    onScrollPositionChanged(payload) {
        const { data, meta, clinicianId } = this.model;
        const { ratio } = payload;
        if (ratio > .95) {
            const { first, last } = meta;
            const firstPage = parseInt(first.number);
            const lastPage = parseInt(last.number);
            const pageSize = parseInt(first.size);

            // can add more - dunno if these links where intended to be the first page in
            // a collection and the last page or what - I have always used pageNumber, pageSize, and total elements
            // but I am going to assume the last in this context is the last page in the collection
            if (firstPage < lastPage) {
                const params = { data, meta, clinicianId, nextPage: firstPage + 1, pageSize };
                debounce(this, this.loadPage, params, 100);
            }
        }
    }
}
