// Task 01. Write a console.log statement saying "Hello World!" for each language that you know.
console.log('Hello world!'); // English
console.log('Привіт, світ!'); // Ukrainian
console.log('Hej världen!'); // Swedish
console.log('Привет, мир!'); // Russian

// Task 02. Find solution for the error in a code: console.log('I'm awesome');
// Fixed code:
console.log('I\'m awesome');

// Task 03. Declare a variable x and initialize it with an integer
// Initialize x
let x;

// Predicted value of x
console.log("the value of x will be: undefined");

//The actual value of x
console.log(x);

// Declare x
x = 15;

// Predicted value of x after declaring
console.log("the value of x will be: 15");

//The actual value of x
console.log(x);

// Task 04. Declare a variable y and initialize it with a string
// Initialize y
let y = "Some text here";

// Predicted value of y
console.log("the value of my string will be: 'Some text here'");

//The actual value of y
console.log(y);

// Declare y
y = 'A new assigned value';

// Predicted value of y after assigning new value
console.log("the value of my string will be: 'A new assigned value'");

//The actual new value of y
console.log(y);

// Task 05. How do you round the number 7.25, to the nearest integer (i.e., whole number)?
// 5.1 Declare a variable z and assign the number 7.25 to it.
let z = 7.25;

// 5.2 console.log z.
console.log(z);

// 5.3 Declare another variable a that has the value of z but rounded to the nearest integer.
let a = Math.round(z);

// 5.4 console.log a.
console.log(a);

// 5.5 So now we have z and a find a way to compare the two values and store the highest of the two in a new variable.
let numHighest = Math.max(a, z);

// 5.6 console.log the highest value.
console.log(numHighest);

// Task 06. Arrays
// 6.1 Declare an empty array. Make sure that the name you choose indicates 'plurality', because an array is capable of containing more than one element. 
let dataTypes = [];

// 6.2 Write a console.log statement that explains in words what you think the value of the array is.
console.log('Expected value is an empty array []');

// 6.3 console.log your array.
console.log(dataTypes);

// 6.4 Create an array that has your favorite animals inside (see if you can find a good name that exactly describes what this variable will hold).
let myFavoriteAnimals = ['owls', 'cats', 'dogs', 'ducks', 'swans', 'snails'];

// 6.5 Log your array.
console.log(myFavoriteAnimals);

// 6.6 Add a statement that adds Daan's favorite animal ('baby pig') to the existing array.
myFavoriteAnimals.push('baby pig');

// 6.7 Log your new array!
console.log(myFavoriteAnimals);

// Task 07. More strings
// Let's consider the following string: let myString = "this is a test".
// 7.1 Add the string to your file and console.log it.
let myString = "this is a test";
console.log(myString);

// 7.2 Find a way to get the length of myString.
let myStringLength = myString.length;

// 7.3 console.log the length of myString.
console.log(myStringLength);


// Task 08. Write a program that checks the types of two variables and prints out SAME TYPE if they are the same type.
// 8.1 First declare at least four variables and assign them different data types.
let someNum = 345;
let someString = 'just a string';
let someArray = ['word', 'food', 'music', 'giraffe'];
let someBoolean = true;

// 8.2 For each variable write a console.log statement that logs the value
console.log('The value of my variable someNum is: ' + someNum);
console.log('The value of my variable someString is: ' + someString);
console.log('The value of my variable someArray is: ' + someArray);
console.log('The value of my variable someBoolean is: ' + someBoolean);

// 8.3 Now write a console.log statement wherein you first explain in words what you think the type of your variables is.
console.log('The type of my variable someNum will be: number');
console.log('The type of my variable someString will be: string');
console.log('The type of my variable someArray will be: object');
console.log('The type of my variable someBoolean will be: boolean');

// 8.4 Now use typeof to log the actual type of your variables.
console.log(typeof (someNum));
console.log(typeof (someString));
console.log(typeof (someArray));
console.log(typeof (someBoolean));

// 8.5 Now compare the types of your different variables with one another.
// 8.6 Make sure to also show a message when the variables you are comparing are not the same type.
function compareTypes(value1, value2) {
  if (typeof (value1) === typeof (value2)) {
    console.log('SAME TYPE');
  } else {
    console.log('NOT THE SAME TYPE');
  }
}

compareTypes(someNum, someArray);
compareTypes(someNum, someString);
compareTypes(someNum, someBoolean);
compareTypes(someString, someArray);
compareTypes(someString, someBoolean);
compareTypes(someArray, someBoolean);

// Task 09. If x equals 7, and the only other statement is x = x % 3, what would be the new value of x?
// 9.1 Add at least 3 console.log statements in which you show that you understand what % does.

// Expected output: 1
let num1 = 7;
num1 %= 3;
console.log(num1);

// Expected output: 3
let num2 = 18;
num2 %= 5;
console.log(num2);

// Expected output: 4
let num3 = 85;
num3 %= 9;
console.log(num3);

// Task 10. Write a program to answer the following questions:
// 10.1 Can you store multiple types in an array? Numbers and strings? Make an example that illustrates your answer.
let multipleTypes = ['some word', 2345, true, [1, 34], 56n, { id: 1234, name: 'John' }];
console.log(multipleTypes);

// 10.2 Can you compare infinities? (Not in Eyad's world) - does 6/0 === 10/0? How can you test this?
// 10.3 Add console.log statements to the above program in which you show that you understand the concepts (just like you've done in the above assignments).
let firstValue = 6 / 0;
let secondValue = 10 / 0;
let comparedInfinities = firstValue === secondValue ? true : false;
console.log(`We can compare infinities by value and type with a strict equality:\n${firstValue} === ${secondValue} returns ${comparedInfinities}`);
