import JSONAPISerializer from '@ember-data/serializer/json-api';
import { camelize } from '@ember/string';

export default class CptCodeSerializer extends JSONAPISerializer {

    keyForAttribute(key) {
        return camelize(key);
    }

    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
        const { data, links } = payload;
        const newData = data.map(item => {
            const { id, type, links, attributes } = item;
            return { id, type, links, attributes: {...attributes, links} }
        });
        return super.normalizeResponse(store, primaryModelClass, { data: newData, links }, id, requestType);
    }
}
