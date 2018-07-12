/**
 * Created by Игорь on 25.03.2017.
 */
const helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ru: 'Привет, мир!'
};

export const greeting = {
    sayHello: function (lang) {
        return helloInLang[lang];
    }
};
