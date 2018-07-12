'use strict';
function testWorker(){
    console.log('testWorker')
}
testWorker()

var angular;

self.addEventListener("message", function(e){
    if(e.data){
        if(e.data[0] && e.data[0].angular){
            angular = e.data[0].angular;
        }
    }
    console.log(angular)
    //self.postMessage();
})
