System.register(['angular2/core', "angular2/router", "./campaign.service", "../../../../a2/paginator/scripts/paginator.component"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, campaign_service_1, router_2, paginator_component_1;
    var CampaignsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (campaign_service_1_1) {
                campaign_service_1 = campaign_service_1_1;
            },
            function (paginator_component_1_1) {
                paginator_component_1 = paginator_component_1_1;
            }],
        execute: function() {
            CampaignsComponent = (function () {
                function CampaignsComponent(_router, _campaignService) {
                    this._router = _router;
                    this._campaignService = _campaignService;
                    this.paginate = { page: 0, rows: 3, items: 0 };
                    this.query = {};
                }
                CampaignsComponent.prototype.getItems = function () {
                    var _this = this;
                    this._campaignService.getItems(this.query, this.paginate)
                        .then(function (items) { _this.items = items; });
                };
                CampaignsComponent.prototype.ngOnInit = function () {
                    this.getItems();
                };
                CampaignsComponent.prototype.onSelect = function (campaign) { this.selectedCampaign = campaign; };
                CampaignsComponent.prototype.gotoDetail = function () {
                    this._router.navigate(['CampaignDetail', { id: this.selectedCampaign._id }]);
                };
                CampaignsComponent = __decorate([
                    core_1.Component({
                        selector: 'my-campaigns',
                        directives: [
                            router_2.ROUTER_DIRECTIVES,
                            paginator_component_1.ServerPaginatorComponent
                        ],
                        templateUrl: 'components/promo/campaign/a2/campaigns.component.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, campaign_service_1.CampaignService])
                ], CampaignsComponent);
                return CampaignsComponent;
            })();
            exports_1("CampaignsComponent", CampaignsComponent);
        }
    }
});
//# sourceMappingURL=campaigns.component.js.map