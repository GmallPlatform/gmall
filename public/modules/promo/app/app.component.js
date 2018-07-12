System.register(['angular2/core', 'angular2/router', 'angular2/http', "./dashboard.component", "../../../components/PROMO/campaign/a2/scripts/campaigns.component", "../../../components/PROMO/campaign/a2/scripts/campaign.service", "../../../components/PROMO/campaign/a2/scripts/campaign-detail.component"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, http_1, dashboard_component_1, campaigns_component_1, campaign_service_1, campaign_detail_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (campaigns_component_1_1) {
                campaigns_component_1 = campaigns_component_1_1;
            },
            function (campaign_service_1_1) {
                campaign_service_1 = campaign_service_1_1;
            },
            function (campaign_detail_component_1_1) {
                campaign_detail_component_1 = campaign_detail_component_1_1;
            }],
        execute: function() {
            //import {CampaignsComponent} from "../../../components/PROMO/campaign/a2/scripts/campaigns.component";
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'gmall-promo',
                        templateUrl: "modules/promo/views/app.component.html",
                        styleUrls: ['modules/promo/css/app.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            http_1.HTTP_PROVIDERS,
                            campaign_service_1.CampaignService
                        ]
                    }),
                    router_1.RouteConfig([
                        {
                            path: 'promo/index',
                            name: 'Dashboard',
                            component: dashboard_component_1.DashboardComponent,
                            useAsDefault: true
                        },
                        {
                            path: 'promo/campaigns',
                            name: 'Campaigns',
                            component: campaigns_component_1.CampaignsComponent
                        },
                        {
                            path: 'promo/campaigns/:id',
                            name: 'CampaignDetail',
                            component: campaign_detail_component_1.CampaignDetailComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map