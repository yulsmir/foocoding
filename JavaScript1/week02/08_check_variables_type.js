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
console.log('The type of my variable someArray will be: array');
console.log('The type of my variable someBoolean will be: boolean');

// 8.4 Now use typeof to log the actual type of your variables.
console.log(typeof(someNum));
console.log(typeof(someString));
console.log(typeof(someArray));
console.log(typeof(someBoolean));

// 8.5 Now compare the types of your different variables with one another.
// 8.6 Make sure to also show a message when the variables you are comparing are not the same type.
function compareTypes(value1, value2) {
  if (typeof(value1) === typeof(value2)) {
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
