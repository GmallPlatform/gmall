'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by Игорь on 25.03.2017.
 */
var helloInLang = {
    en: 'Hello world!',
    es: '¡Hola mundo!',
    ru: 'Привет, мир!'
};

var greeting = exports.greeting = {
    sayHello: function sayHello(lang) {
        return helloInLang[lang];
    }
};
//# sourceMappingURL=greeting.js.map