/**
 * Created by Igor on 09.03.2016.
 */
import {Component} from 'angular2/core';
import {OnInit} from "angular2/core";
import {Hero} from "./hero";
import {HeroService} from "./hero.service";
import {Router} from "angular2/router";
@Component({
    selector: 'my-heroes',
    templateUrl:'modules/promo/views/heroes.component.html'
})
export class HeroesComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;
    constructor(
        private _router: Router,
        private _heroService: HeroService) { }
    getHeroes() {
        this._heroService.getHeroes().then(heroes => this.heroes = heroes);
    }
    ngOnInit() {
        this.getHeroes();
    }
    onSelect(hero: Hero) { this.selectedHero = hero; }
    gotoDetail() {
        this._router.navigate(['CamapignDetail', { id: this.selectedHero.id }]);
    }
}