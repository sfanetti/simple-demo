import Base from './base';

export default class IndexRoute extends Base {
    redirect(){
        this.transitionTo('pick-clinician');
    }
}
