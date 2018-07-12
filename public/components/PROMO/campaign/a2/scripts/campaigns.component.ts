/**
 * Created by Igor on 09.03.2016.
 */
import {Component,OnInit} from 'angular2/core';
import {Router} from "angular2/router";
import {CampaignService} from "./campaign.service";
import {Campaign} from "./campaign";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {ServerPaginatorComponent} from "../../../../a2/paginator/scripts/paginator.component";

@Component({
    selector: 'my-campaigns',
    directives: [
        ROUTER_DIRECTIVES,
        ServerPaginatorComponent

    ],
    templateUrl:'components/promo/campaign/a2/campaigns.component.html'
})
export class CampaignsComponent implements OnInit {
    public items: Campaign[];
    public selectedCampaign: Campaign;
    public paginate={page:0,rows:3,items:0};
    public query={};
    constructor(
        private _router: Router,
        private _campaignService: CampaignService){
    }
    getItems() {
        this._campaignService.getItems(this.query,this.paginate)
            .then((items:Campaign[]) =>{this.items = items});
    }
    ngOnInit() {
        this.getItems();
    }
    onSelect(campaign: Campaign) { this.selectedCampaign = campaign; }
    gotoDetail() {
        this._router.navigate(['CampaignDetail', { id: this.selectedCampaign._id }]);
    }
}