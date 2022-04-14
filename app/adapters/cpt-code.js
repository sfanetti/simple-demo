import BaseAdapter from './base';

/**
 * Specific adapter for CptCodes.  The parameter structure of the API endpoint is not a valid identifier
 * so when it was trying to serialize things it had issues.  I am sure there is a way around it - maybe
 * uriEncode it? Dunno
 */
export default class CptCodeAdapter extends BaseAdapter {
    sortQueryParams() {
        return {};
    }
}
