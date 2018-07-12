/**
 * Created by Igor on 08.03.2016.
 */
import {Component, OnInit } from "angular2/core";
import {RouteParams} from 'angular2/router';
import {Campaign} from "./campaign";
import {CampaignService} from "./campaign.service";
import {Router} from "angular2/router";

@Component({
    selector:"my-campaign-detail",
    templateUrl:'components/promo/campaign/a2/campaign.component.html'
})
export class CampaignDetailComponent {
    item: Campaign;
    constructor(
        private _campaignService: CampaignService,
        private _routeParams: RouteParams,
        private _router:Router) {
    }
    ngOnInit() {
        let id:string = this._routeParams.get('id');
        this._campaignService.getItem(id)
            .then((campaign:Campaign) => this.item = campaign)
    }
    goBack() {
        let link = ['Campaigns'];
        this._router.navigate(link);
    }
}