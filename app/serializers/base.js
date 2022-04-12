import JSONAPISerializer from '@ember-data/serializer/json-api';
import { camelize } from '@ember/string';

export default class CptCodeSerializer extends JSONAPISerializer {

    keyForAttribute(key) {
        return camelize(key);
    }

    /*
    When first scanning the API I thought these links might go somewhere interesting
    so I grabbed them off the payload and added then to the attributes
    but when I ran them they go nowhere so I am taking them out

    normalizeResponse(store, primaryModelClass, payload, id, requestType) {
        const { data, links } = payload;
        const newData = data.map(item => {
            const { id, type, links, attributes } = item;
            return { id, type, links, attributes: {...attributes, links} }
        });
        return super.normalizeResponse(store, primaryModelClass, { data: newData, links }, id, requestType);
    }

    */
}
