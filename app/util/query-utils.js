/**
 * Simple query parser for the params - have not used the patter - I assume its graphql?
 */
export default class QueryUtils {
    static getQueryComponents(operation, type, value) {
        if (!operation || !type || !value) {
            return '';
        }
        return `${operation}[${type}]=${value}`;
    }

    static getQueryParams(collection, operation = 'filter') {
        return Object.keys(collection).map(key => {
            const value = collection[key];

            if (typeof value === 'string') {
                return QueryUtils.getQueryComponents(operation, key, value);

            } else if (typeof value === 'object') {
                return QueryUtils.getQueryParams(value, value);
            }
        }).join('&');
    }
}
