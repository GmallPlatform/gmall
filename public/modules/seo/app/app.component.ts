import { Component} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';


import {DashboardComponent} from "./dashboard.component";
import {CampaignsComponent} from "../../../components/PROMO/campaign/a2/scripts/campaigns.component";
import {CampaignService} from "../../../components/PROMO/campaign/a2/scripts/campaign.service";
import {CampaignDetailComponent} from "../../../components/PROMO/campaign/a2/scripts/campaign-detail.component";
//import {CampaignsComponent} from "../../../components/PROMO/campaign/a2/scripts/campaigns.component";
@Component({
    selector: 'gmall-promo',
    templateUrl:"modules/promo/views/app.component.html",
    styleUrls:['modules/promo/css/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        CampaignService
    ]
})
@RouteConfig([
    {
        path: 'promo/index',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: 'promo/campaigns',
        name: 'Campaigns',
        component: CampaignsComponent
    },
    {
        path: 'promo/campaigns/:id',
        name: 'CampaignDetail',
        component: CampaignDetailComponent
    }
])

export class AppComponent{

}
