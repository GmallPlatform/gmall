
var array=[];
for(let i=0;i<3002;i++){
    array.push(i)
}
async function run() {

    var i,j,temparray,chunk = 2000,arr2=[];
    for (i=0,j=array.length; i<j; i+=chunk) {
        temparray = array.slice(i,i+chunk);
        arr2.push(temparray)
    }
    arr2.reverse();
    for(const item of arr2){
        await sendEmailForEachUser(item)
    }
    console.log('all done')
}

run()


function sendEmailForEachUser(users) {
    const sentEmailResponse= users.map(user => {
        let maildata={user:user,num:user+'!'}
        return send(maildata)
    });
     return sentEmailResponse.reduce((chain, sendEmail) => {
        return chain.then(() => sendEmail)
            .then(text => text);
    }, Promise.resolve());




    function send(data) {
        return new Promise(function (rs,rj) {
            setTimeout(function () {
                console.log(data.num)
                rs()
            },data.user)
        })

    }
}

