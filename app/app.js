import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

const handleFailedToStart = () => {
    // choose another path based on general failure to start routing
    const origin = window.location.origin;
    window.location.replace(`${origin}${config.rootURL}/${config.ERROR_PATHS.UNKNOWN}`);
};

export default class App extends Application {
    rootElement = 'body';
    modulePrefix = config.modulePrefix;
    podModulePrefix = config.podModulePrefix;
    Resolver = Resolver;
    didBecomeReady() {
        try {
            return super.didBecomeReady();
        } catch(e) {
            // send logger message NewRelic
            handleFailedToStart(e);
        }
    }
}

loadInitializers(App, config.modulePrefix);
