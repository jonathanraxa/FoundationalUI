// LECTURE: let and const


// ES5
var name5 = "Jane Smith";
var age5 = 23;
name5 = "Jane Miller";
// console.log(name5);


// ES6
const name6 = 'Jane Smith'; // immutable variable
let age6 = 23;

// function scope vs blocked scope

// ES5
function driversLicense5(passedTest){
    if (passedTest){
        var firstName = "John"; 
        var yearOfBirth = 1990; 
    }
    // console.log(firstName + ', born in: ' + yearOfBirth); // this will work
}

// ES6
function driversLicense6(passedTest) {
    
    // console.log(firstName); won't work, because not defined yet (not even hoisted as undefined)

    let firstName;
    const yearOfBirth = 1990;

    if (passedTest) {
         firstName = "John";
    }
    // console.log(firstName + ', born in: ' + yearOfBirth); // this will NOT work unless variables are declared within the block scope
}

driversLicense(true);


// if this was VAR, then the 23 would be overridden
let i = 23; 

for (let i = 0; i < 5; i++){
    // console.log(i); // 0 1 2 3 4
}
// console.log(i); // 23

// -------- LECTURE: Blocks and IIFEs --------

// ES5 - old way of declaring private variable scopes
(function(){
    var c = 3; 
})();

// ES6 - naturally its own scope and private
{
    // this is a block
    const a = 1; 
    let b =  2; 
    var c = 3; // NOT blocked scope
}

// -------- LECTURE: Strings --------

let firstName = 'john'; 
let lastName = 'smith';
const yearOfBirthStringsLecture = 1990; 
function calcAge(year){
    return 2016 - year; 
} 

// template literals - new feature of es6 that makes our lives easier...

// ES5 
// console.log('This is ' + firstName + ', ' + lastName + ', ' + calcAge(yearOfBirthStringsLecture));

// ES6
// - we use backticks now to indicate that we want to use template literals
// console.log(`This is ${firstName} ${lastName}, born on ${calcAge(yearOfBirthStringsLecture)}`);

// string methods
// startsWith | endsWith | includes | repeat
// const n = `${firstName} ${lastName}`; 

// console.log(n.startsWith('n')); // false
// console.log(n.endsWith('th')); // true
// console.log(n.includes(' ')); // true
// console.log(firstName.repeat(5)); // johnjohnjohnjohnjohn
// console.log(`${firstName} `.repeat(5)); // john john john john john

// -------- LECTURE: Arrow Functions (intro) --------

const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(el) {
    return 2016 - el; 
});
// console.log(ages5); 


// ES6
// => will automatically return, no need for 'return'
const ages6 = years.map(el => 2016 - el); // this returns by itself

ages6 = years.map((el, index) => `Age element ${index + 1}: ${2016 - el}.`);

ages6 = years.map((el, index) => {
    const now = new Date().getFullYear();
    const age = now - el; 
    return `Age element ${index + 1}: ${2016 - el}.`; // need to write out return because it's inside {...}
}); // use {...} if there is more than one line of code

// three ways to use arrow functions
// 1. return on one line
// 2. use ( arg1, arg2 ) 
// 3. {...}

// -------- LECTURE:  Arrow Functions 2 -> Lexical 'this' keyword --------

// ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function(){
        var self = this; // now the 'self' variable will point to 'this', refering to the object
        // this is a regular function call - so it points to the window object 
        document.querySelector('.green').addEventListener('click', 
        function() {
            var str = 'This box number ' + self.position + ' and it is ' + self.color;
            // alert(str);
        });
    }
}
box5.clickMe(); // This box number is undefined and is undefined
// the THIS keyword is pointing to a global window object inside the function 


// ES6
var box6 = {
    color: 'green',
    position: 1,
    clickMe: function () {
        // a method that calls another function that uses at '=>' that preservers the value of the this keyword
        document.querySelector('.green').addEventListener('click',
            () => {
                var str = 'This box number ' + this.position + ' and it is ' + this.color;
                alert(str);
            });
    }
}
box6.clickMe(); 


// this all becomes undefined - be careful what the 'this' keyword actually points to
var box66 = {
    color: 'green',
    position: 1,
    clickMe:  () => { // this method no longer has its own 'this' keyword, since the context is GLOBAL
        document.querySelector('.green').addEventListener('click',
            () => {
                var str = 'This box number ' + this.position + ' and it is ' + this.color;
                alert(str);
            });
    }
}
box66.clickMe(); 


// FUNCTION CONSTRUCTORS and CALLING METHODS WITH FUNCTIONS
// ES5 
function Person(name){
    this.name = name;
}
Person.prototype.myFriends5 = 
function(friends){
    // in HERE, we would have access to the THIS variable
    var arr = friends.map(function(currentElement) {
        // in HERE, is not defined in the same context, so 'this' would be a global object
        return this.name + 'is friends with ' + currentElement;
    }.bind(this)); // 'this' is bound from the outside of the function and now points to this function
    // using call, bind, and apply to set the 'this' variable manually
    // console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends); 

// ES6
Person.prototype.myFriends6 =
function (friends) { let arr = friends.map( currentElement => { `${this.name} is friends with ${currentElement}` }); 
    // console.log(arr);
}

new Person('Mike').myFriends6(friends);


// -------- LECTURE: DESTRUCTURING --------

// ES5
var john = ['John', 26];
var name = john[0];
var age = john[1];

// ES6
const [name, year] = ['John', 26]; // creates a constant called 'name' and 'year' and assigns them
// opposite of constructing a data structure
// also works with objects

// objects

const obj = {
    firstName = 'John', 
    lastName = 'Smith'
};

const {firstName, lastName} = obj; // the variables need to be the same name as the object keys
const {firstName: a, lastName: b} = obj; // if you don't want to use the same variables
// console.log(a, b);


function calcAgeRetirement(year){
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}

const [age2, retirement] = calcAgeRetirement(1990); // takes the return values and destructures them to those array values

// ES5 - finding the index of the true value (age over 18)
var ages = [12, 17, 8, 21, 14, 11];
var full = ages.map(function(cur){
    return cur >= 18;
});
// console.log(full); // f f f t f f
// console.log(full.indexOf(true));
// console.log(ages[full.indexOf(true)]);


// ES6 - finding the index of the true value
// findIndex | find
ages.findIndex(cur => cur >= 18); // find the element of the index at true

// find - finds teh value of the age OVER 18 and returns it
// console.log(ages.find(cur => cur >= 18));


// -------- LECTURE:  SPREAD OPERATOR --------

function addFourAges(a, b, c ,d){
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);

// ES5 - passing an array into the function
var ages = [18, 30, 12, 21];
// apply method - used to use the array as arguments

var sum2 = addFourAges.apply(null, ages); // specify the 'this' variable

// ES6 
const sum3 = addFourAges(...ages); // add all the elements of the array to the addFourAges method

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, ...familyMiller];

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h, ...boxes];

// creates an array from 'all'
// changes the style for each of the elements
Array.from(all).forEach(cur => cur.style.color = 'purple');

// -------- LECTURE:  REST PARAMETERS --------

// takes an array and transforms it into single parameters

// ES5 
function isFullAge5() {
    // 'arguments' is a special variable that we have access to
    // console.log(arguments); // Arguments[3] -> 0: 1990 (not an array, returns an object)
    var argsArr = Array.prototype.slice.call(arguments); // creates an array of the arguments passed into it
    argsArr.forEach(function(cur) {
        // console.log((2016 - cur) >= 18);
    })
}
isFullAge5(1990, 1999, 1965); 


// ES6
function isFullAge6(...years){
    // console.log(years); // this becomes an array
    years.forEach(cur => (2016 - cur) >= 18);
}

// ES5 - accepting a parameter with the age limit
function isFullAge55(limit) {
    var argsArr = Array.prototype.slice.call(arguments, 1); // at pos 1, it starts to copy our array
    argsArr.forEach(function (cur) {
        // console.log((2016 - cur) >= limit);
    })
}
isFullAge55(21, 1990, 1999, 1965); // skips 21, and then iterates through the rest of the array


// ES6 - adding a limit
function isFullAge66(limit, ...years) { // 'years' is an undetermined # of args
    // console.log(years); // this becomes an array
    years.forEach(cur => (2016 - cur) >= limit);
}

// -------- LECTURE:  DEFAULT PARAMETERS --------

// ES5
function SmithPerson5(firstName, yearOfBirth, lastName, nationality){

    // handles anything not defined
    lastName === undefined ? lastName = 'Smith' : lastName = lastName;
    nationality === undefined ? nationality = 'American' : nationality = nationality;
 
    this.firstName = firstName;
    this.yearOfBirth = yearOfBirth;
    this.lastName = lastName;
    this.nationality = nationality;
    
}
var john = new SmithPerson5('John', 1990); // javascript will assign an 'undefined' to the rest of the parameters
var emily = new SmithPerson5('Emily', 1990, 'Diaz', 'Spanish'); // overrides the default 

// ES6 - setting default parameters
function SmithPerson6(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American'){
    this.firstName = firstName;
    this.yearOfBirth = yearOfBirth;
    this.lastName = lastName;
    this.nationality = nationality;
}
var john = new SmithPerson6('John', 1990); // javascript will assign an 'undefined' to the rest of the parameters
var emily = new SmithPerson6('Emily', 1990, 'Diaz', 'Spanish'); // overrides the default 

// -------- LECTURE:  MAPS --------

// with maps, we can use ANYTHING as maps

const question = new Map(); // creates a new map

// first key of map
question.set('question', 'What is the official name of the latest major JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6'); 
question.set(3, 'ES2015'); 
question.set(4, 'ES7'); 
question.set('correct', 3);
question.set(true, 'Correct answer: D'); 
question.set(false, 'Wrong, please try again!'); 

// retrieves the value from a given KEY
question.get('question'); // returns the value 

// --- SIZE | DELETE | HAS | CLEAR ---
// question.size; 
// question.delete(4);
// if (question.has(4)){ ... }
// question.clear();

// FOR EACH
// we have access as a MAP object to for each method

// question.forEach((value, key) => {
//     console.log(`This is ${key}, and it's set to ${value}`);
// });

// questions.entries() returns all our entires 
for (let [key, value] of question.entries()) { // using destructuring to assign variables
    if (typeof[key] === 'number'){
        console.log(`Answer ${key}: ${value}`);
    }
}
const ans = parseInt(prompt('Write the correct answer')); // user needs to input a number

// (3 === 3) or TRUE --> from question.set(true, 'Correct ansewr...);
question.get(ans === question.get('correct')); // if TRUE - it will return to us either correct or wrong

// MAPS > OBJECTS for HASHMAPS
// 1. we can use ANÁTHING as keys for maps
// 2. maps are also iterable - making it easy to loop and iterate through them

// -------- LECTURE:  CLASSES --------

// syntactic sugar to make obj inheritance look nicer

// ES5
var Person5 = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}
Person5.prototype.calculateAge = function() {
    var age = new Date().getFullYear - this.yearOfBirth;
    console.log(age);
}
var john5 = new Person5('John', 1990, 'teacher');

// ^^^ this is the exact same as above
// usually HIDES the OO inheritance structure in JS, but oh well

// ES6
class Person6 { 
    constructor(name ,yearOfBirth ,job){
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    calculateAge(){
        var age = new Date().getFullYear - this.yearOfBirth;
        console.log(age);
    }

    // something like a HELPER function - newly created objects cannot access
    static greeting(){
        console.log('Hey there!');
    }
}
var john6 = new Person6('John', 1990, 'teacher');
Person6.greeting(); // not entirely useful, but can still be used, just not inherited


// -------- LECTURE:  CLASSES WITH SUB-CLASSES --------

var Person55 = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}
Person55.prototype.calculateAge = function () {
    var age = new Date().getFullYear - this.yearOfBirth;
    console.log(age);
}
var Athlete55 = function(name, yearOfBirth, job, olymicGames, medals){
    // we need to indicate the new 'this' keyword
    Person55.call(this, name, yearOfBirth, job);
    this.olymicGames = olymicGames;
    this.medals = medals;
}

// Athlete55 inherits from the Person55 class
Athlete55.prototype = Object.create(Person55.prototype); // sets the Person55 prototype to the Athelete55 prototype

// only in Athlete55 will we have this function
Athlete55.prototype.wonMedal = function(){
    this.medals++;
    console.log(this.medals); 
}


var johnAthlete = new Athlete55('John', 1990, 'swimmer', 3, 10); 
johnAthlete.calculateAge();
johnAthlete.wonMedal();



// ES6 - sub-classes
class Person66 {
    constructor(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }
    calculateAge() {
        var age = new Date().getFullYear - this.yearOfBirth;
        console.log(age);
    }
}

// this class EXTENDS to get things from the person class
class Athelete66 extends Person66 {
    constructor(name, yearOfBirth, job, olymicGames, medals){

        // similiar to this --> Person55.call(this, name, yearOfBirth, job);
        super(name, yearOfBirth, job); // calls the parent attributes
        
        this.olymicGames = olymicGames;
        this.medals = medals; 
        
    }

    wonMedal() {
        this.medals++; 
        console.log(this.medals); 
    }
}

const johnAthlete6 = new Athelete66('John', 1990, 'swimmer', 3, 10); 

johnAthlete6.wonMedal();
johnAthlete6.calculateAge(); 