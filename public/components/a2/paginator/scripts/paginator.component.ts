import {Component,OnInit} from 'angular2/core';
import {NgClass} from 'angular2/common';
import {Paginate} from "../../interface/paginate";
@Component({
    selector: 'server-paginator',
    inputs: ['paginate','getitems'],
    templateUrl:'components/a2/paginator/paginator.component.html',
    styleUrls:['components/a2/paginator/css/component.paginator.css'],
    directives: [NgClass]
})
export class ServerPaginatorComponent implements OnInit{
    public arrayPage:any=[0,1,2,3];
    public paginate:Paginate;
    public getitems:Function;
    public pages:number=0;
    constructor(){
    }
    ngOnInit(){
        //console.log(this.getitems);
        Object.observe(this.paginate, function(changes:any) {
            //is triggering
            console.log(changes);
        });
        this.pages=this.pageCount();
    }
    setPage(page:number){}
    pageCount(){
        if(!this.paginate.items){return 0}
        let count = Math.ceil(this.paginate.items / this.paginate.rows); if (count === 1) { this.paginate.page = 0; }
        return count;
    }
    perviousPage(){}
    isFirstPage(){}
    isLastPage(){}
    nextPage(){}
    getPageStr(i:number){
        if (Number(i) || i===0){return i+1} else {return i}
    }

}
/*
var l;
scope.paginator={};
scope.$watch('paginate.items',function(n,o){
    //console.log(n)
    if (n || n===0) {
        scope.paginate.items=Number(n)
        l=scope.paginator.pageCount();
        scope.arrayPage=scope.getListPage();
    }
})


function getList(){
    //console.log(scope.scroll)
    if(scope.scroll){
        anchorSmoothScroll.scrollTo(scope.scroll,200);
    }
    scope.getlist();
}

scope.paginator.setPage = function (page) {
    //console.log(page)
    page = Number(page);
    if (!page && page!==0) return;
    if (page > scope.paginator.pageCount() || page==scope.paginate.page) {
        return;
    }
    scope.paginate.page = page;

    if (scope.paginate.page==0){
        //console.log('думаем');
        scope.arrayPage=scope.getListPage(2)

    }
    //console.log(l)
    if (scope.paginate.page==(l-1)){
        console.log('посдедняя страница');
        scope.arrayPage=scope.getListPage(6)
    }

    if (scope.paginate.page==scope.arrayPage[3] && scope.arrayPage.length==6&& ((l-1)-scope.paginate.page)>2){
        scope.arrayPage=scope.getListPage()
    } else if(scope.paginate.page==scope.arrayPage[4] && scope.arrayPage.length==7){
        scope.arrayPage=scope.getListPage()
    } else if (scope.paginate.page==scope.arrayPage[2] && scope.paginate.page-scope.arrayPage[0]>=2){
        scope.arrayPage=scope.getListPage()
    }


    getList()
};
scope.paginator.nextPage = function () {
    if (scope.paginator.isLastPage()) {
        return;
    }
    scope.paginate.page++;
    if (scope.paginate.page==scope.arrayPage[3] && scope.arrayPage.length==6&& ((l-1)-scope.paginate.page)>2){
        scope.arrayPage=scope.getListPage()
    } else if(scope.paginate.page==scope.arrayPage[4] && scope.arrayPage.length==7){
        scope.arrayPage=scope.getListPage()
    } else if (scope.paginate.page==scope.arrayPage[2] && scope.paginate.page-scope.arrayPage[0]>=2){
        scope.arrayPage=scope.getListPage()
    }
    getList()
};
scope.paginator.perviousPage = function () {
    if (scope.paginator.isFirstPage()) {
        return;
    }
    scope.paginate.page--;
    if (scope.paginate.page==scope.arrayPage[3] && scope.arrayPage.length==6&& ((l-1)-scope.paginate.page)>2){
        scope.arrayPage=scope.getListPage()
    } else if(scope.paginate.page==scope.arrayPage[4] && scope.arrayPage.length==7){
        scope.arrayPage=scope.getListPage()
    } else if (scope.paginate.page==scope.arrayPage[2] && scope.paginate.page-scope.arrayPage[0]>=2){
        scope.arrayPage=scope.getListPage()
    }
    getList()
};
scope.paginator.firstPage = function() {
    scope.paginate.page = 0;
    getList()
};
scope.paginator.lastPage = function () {
    scope.paginate.page = scope.paginator.pageCount() - 1;
    getList()
};
scope.paginator.isFirstPage = function () {
    return scope.paginate.page == 0;

};
scope.paginator.isLastPage = function () {
    return scope.paginate.page == scope.paginator.pageCount() - 1;
};
scope.paginator.pageCount = function () {
    var count = Math.ceil(parseInt(scope.paginate.items, 10) / parseInt(scope.paginate.rows, 10)); if (count === 1) { scope.paginate.page = 0; }
    return count;
};


scope.changeRow = function(rows){
    scope.paginate.rows=rows;
    while (scope.paginator.pageCount()<(scope.paginate.page-1)){
        scope.paginate.page--;
    }
    getList()
}
scope.arrayPage=[];

scope.getListPage = function(num){
    //console.log(num)
    //if (!page){page=}
    var page=scope.paginate.page;
    var arrayPage=[];
    if (num===0 || num){page = num}
    //var page=scope.paginate.page;
    //console.log(page,l)
    if (l<=6){
        for(var i=0;i<l;i++){
            arrayPage.push(i)
        }
    }else{
        if (page>=3 ){
            arrayPage.push(0)
            arrayPage.push('...');
            arrayPage.push(page-1)
            arrayPage.push(page)
            arrayPage.push(page+1)
        } else{
            for(var i=0;i<4;i++){
                arrayPage.push(i)
            }
        }
        if(((l-1)-page)>2){
            arrayPage.push('...');
        }
        arrayPage.push(l-1)
    }
    //console.log(arrayPage)
    return arrayPage;
}
scope.getPageStr = function(i){
    if (Number(i) || i===0){return i+1} else {return i}
}*/
