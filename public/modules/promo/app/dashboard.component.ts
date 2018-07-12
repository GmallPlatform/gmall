/**
 * Created by Igor on 07.03.2016.
 */
import { Component }       from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
@Component({
    selector: 'my-dashboard',
    directives: [ROUTER_DIRECTIVES],
    templateUrl:"modules/promo/views/dashboard.component.html"
})

export class DashboardComponent {
    constructor(){
        console.log('ddd')
    }
}
