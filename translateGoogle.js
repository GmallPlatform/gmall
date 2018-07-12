// Imports the Google Cloud client library
const Translate = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'webdeal-180512';
const fileName='WebDeal-d2c2b2c82738.json'

// Instantiates a client
const translate = new Translate({
    keyFilename:fileName
});

// The text to translate
const text = 'With a few clicks, I learned that about 500 advertisers — many that I had never heard of, like Bad Dad, a motorcycle parts store, and Space Jesus, an electronica band — had my contact information, which could include my email address, phone number and full name. Facebook also had my entire phone book, including the number to ring my apartment buzzer. The social network had even kept a permanent record of the roughly 100 people I had deleted from my friends list over the last 14 years, including my exes.';
// The target language
const target = 'ru';


// Translates some text into Russian
translate
    .translate(text, target)
    .then(results => {
        const translation = results[0];

        console.log(`Text: ${text}`);
        console.log(`Translation: ${translation}`);
    })
    .catch(err => {
        console.error('ERROR:', err);
    });