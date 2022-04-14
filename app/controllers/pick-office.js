import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ListOfficesController extends Controller {
    queryParams = ['cptCode'];

    @tracked cptCode = '';
}
