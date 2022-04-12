
const PARAM_CAPTURE = /^(.+)\[(.+)\]=(.+)$/i;

export default class ResponseUtils {
    static processResponse(response, params, session) {
        const { links: _links = {}, content = [] } = response || {};
        if (params && session) {
            Object.keys(params).forEach(key => {
                session[key] = params[key];
            });
        }

        if (!content) {
            return {
                ...params,
                data: [],
                meta: { first: {}, last: {}}
            }
        }
        const data = content.map(resultItem => resultItem.getRecord());
        const linkData = ResponseUtils.parseRouteLinks(_links) || [];
        const [ first, last ] = linkData.map(link => link.page );
        return {
            ...params,
            data,
            meta: { first, last }
        }
    }

    static parseRouteLinks(links) {
        return Object.keys(links).map(key => {
            const url = decodeURIComponent(links[key]);
            if (url) {
                const [, params] = url.split('?');
                if (params) {
                    return params.split('&').map(param => {
                        const [,operation, target, value ] = PARAM_CAPTURE.exec(param);
                        const out = {};
                        out[operation] = [target, value];
                        return out;
                    }).reduce((acc, targetValues) => {
                        Object.keys(targetValues).forEach(key => {
                            const current = acc[key] ? acc[key]  : {};
                            const arr = targetValues[key];

                            const [target, value] = arr;

                            current[target] = value;
                            acc[key] = current;
                        });
                        return acc;
                    }, {});
                }
            }
        });
    }
}
