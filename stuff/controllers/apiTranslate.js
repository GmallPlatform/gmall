// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');
const to = require('../../modules/to.js')

// Your Google Cloud Platform project ID
const projectId = 'webdeal-180512';
const fileName='./WebDeal-d2c2b2c82738.json'

// Instantiates a client

// The text to translate
const text = 'With a few clicks, I learned that about 500 advertisers — many that I had never heard of, like Bad Dad, a motorcycle parts store, and Space Jesus, an electronica band — had my contact information, which could include my email address, phone number and full name. Facebook also had my entire phone book, including the number to ring my apartment buzzer. The social network had even kept a permanent record of the roughly 100 people I had deleted from my friends list over the last 14 years, including my exes.';
// The target language
const target = 'ru';


// Translates some text into Russian
exports.translate=function(req,res,next){
    //console.log(req.body)
    const translate = new Translate({
        keyFilename:fileName
    });
    const target = req.body.target;
    if(req.body.text && !req.body.texts){
        req.body.texts=[req.body.text]
    }
    const texts = req.body.texts;
    if(texts && texts.length){
        doTranslate(texts,target).then((rs)=>res.json(rs)).catch((err)=>next(err));
    }else{
        let err=new Error('nothing to translate')
        next(err)
    }



    function doTranslate(texts,target) {
        return Promise.all(texts.map((text) => {
            if(text.length>10000)
            return translateFoo(text,target)
        }))

    }
    function translateFoo(text,target){
        return translate
            .translate(text,target)
            .then(results => {
                //console.log(results)
                const translation = results[0];
                return translation
            })
            .catch(err => {
                console.error('ERROR:', err);
            })
    }


}


async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

/*
//https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
//https://gist.github.com/Atinux/fd2bcce63e44a7d3addddc166ce93fb2
const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}
const start = async () => {
    await asyncForEach([1, 2, 3], async (num) => {
        await waitFor(50)
        console.log(num)
    })
    console.log('Done')
}
start()
*/
/*
//https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
async function asyncTask(cb) {
    let err, user, savedTask;

    [err, user] = await to(UserModel.findById(1));
    if(!user) return cb('No user found');

    [err, savedTask] = await to(TaskModel({userId: user.id, name: 'Demo Task'}));
    if(err) return cb('Error occurred while saving task');

    if(user.notificationsEnabled) {
        const [err] = await to(NotificationService.sendNotification(user.id, 'Task Created'));
        if(err) return cb('Error while sending notification');
    }

    cb(null, savedTask);
}
*/

