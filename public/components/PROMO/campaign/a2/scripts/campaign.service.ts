import {Injectable} from "angular2/core";
import {CAMPAIGNS} from "./mock-campaigns";
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {Campaign} from "./campaign";
@Injectable()
export class CampaignService {
    constructor (private http: Http) {};
    private _campaignsUrl = 'api/collections/Campaign';  // URL to web api

    private _getItems(){
        return this.http.get(this._campaignsUrl)
            .map(res => <Campaign[]> res.json())
            //.do(data => console.log(data)) // eyeball results in the console
            .catch(this.handleError);
    }
    private _getItem(_id: string){
        return this.http.get(this._campaignsUrl+'/'+_id)
            .map(res => <Campaign> res.json())
            .catch(this.handleError);
    }
    private handleError (error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    getItems (query:any,paginate:any) {
        //return Promise.resolve(CAMPAIGNS)
        return new Promise((resolve,reject)=>{
            this._getItems().subscribe((items:Campaign[])=>{
                if(items && items.length){
                    paginate.items=items.shift().index;
                }else{
                    paginate.items=0;
                }
                resolve(items)
            });
        })

    }

    getItem(_id: string) {
        return new Promise((resolve,reject)=>{
            this._getItem(_id).subscribe((item:Campaign)=>{
                resolve(item)
            });
        })
    }
}