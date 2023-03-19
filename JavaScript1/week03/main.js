// Task 01. Strings 
// 1.1 Add the string to your file and log it.
let myString = "hello,this,is,a,difficult,to,read,sentence";
console.log(myString);

// 1.2 Log the length of myString.
console.log(myString.length);

// 1.3 The commas make that the sentence is quite hard to read. Find a way to remove the commas from the string and replace them with spaces.
myString = myString.split(',').join(' ');
console.log(myString)