var jsObjects = [
    {a: 1, b: 2},
    {a: 3, b: 4},
    {a: 5, b: 6},
    {a: 7, b: 8}
];
var result = jsObjects.filter(function( obj ) {
    return obj.b == 6;
});
result[0].a=12
console.log(result)
console.log(jsObjects)
return;

class Person {
    constructor(name) {
        // common convention is to prefix properties with `_`
        // if they're not supposed to be used. See the appendix
        // if you want to see an alternative
        this._name = name
        this.greeting = 'Hey there!'
        //console.log('name',name)
    }
    setName(strName) {
        this._name = strName
    }
    getName() {
        return this._getPrefixedName('Name')
    }
    getGreetingCallback() {
        const {greeting, _name} = this
        return (subject) => `${greeting} ${subject}, I'm ${_name}`
    }
    _getPrefixedName(prefix) {
        return `${prefix}: ${this._name}`
    }
}
const person = new Person('Jane Doe')
person.setName('Sarah Doe')
person.greeting = 'Hello'
//console.log(person.getName()) // Name: John Doe
const cb = person.getGreetingCallback() // Hello Jeff, I'm Sarah Doe
//console.log(cb('Jeff'))
return;

var foo = 10;
foo == 10 && doSomething(); // is the same thing as if (foo == 10) doSomething();
foo == 5 || doSomething(); // is the same thing as if (foo != 5) doSomething();
//The logical OR could also be used to set a default value for function argument.
function doSomething(arg1){
    arg1 = arg1 || 10; // arg1 will have 10 as a default value if it’s not already set
}











