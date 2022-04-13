import JSONAPISerializer from '@ember-data/serializer/json-api';
import { camelize } from '@ember/string';

export default class CptCodeSerializer extends JSONAPISerializer {

    keyForAttribute(key) {
        return camelize(key);
    }
}
