// Task 01. Strings
// 1.1 Add the string to your file and log it.
let myString = 'hello,this,is,a,difficult,to,read,sentence';
console.log(myString);

// 1.2 Log the length of myString.
console.log(myString.length);

// 1.3 The commas make that the sentence is quite hard to read. Find a way to remove the commas from the string and replace them with spaces.
myString = myString.split(',').join(' ');
console.log(myString);

// Task 02. Arrays
let favoriteAnimals = ['blowfish', 'capricorn', 'giraffe'];

// 2.1 Add a statement that adds Mauro's favorite animal 'turtle' to the existing array.
const MAUROS_FAVORITE_ANIMAL = 'turtle';
favoriteAnimals.push(MAUROS_FAVORITE_ANIMAL);

// 2.2 Log your new array!
console.log(favoriteAnimals);

// 2.3 Now add Jim's favorite animal to the array, it's 'meerkat', but make sure it will be placed after 'blowfish' and before 'capricorn'.
const JIMS_FAVORITE_ANIMAL = 'meerkat';
favoriteAnimals.splice(1, 0, JIMS_FAVORITE_ANIMAL);

// 2.4 Write a console.log statement that explains in words you think the new value of the array is.
console.log(`The new value of array will be: ["blowfish", "meerkat", "capricorn", "giraffe"]`);

// 2.5 Log your new array!
console.log(favoriteAnimals);

// 2.6 Log the length of the array, add a message: 'The array has a length of: ' (here you should show the length of the array).
console.log('The array has a length of: ' + favoriteAnimals.length);

// 2.7 Jason does not like 'giraffe', delete this animal from the array.
favoriteAnimals.splice(favoriteAnimals.length - 2, 1);

// 2.8 Again log your new array.
console.log(favoriteAnimals);

// 2.9 Now if unlike Jim, you don't like 'meerkat' and you want to delete it from the array,
// but you don't know the position or the index of the item in the array, how can you find it?
const meerkatIndex = favoriteAnimals.indexOf('meerkat');

// 2.10 Log the index of 'meerkat'. Add a message so it says: 'The item you are looking for is at index: '
// (here you should show the index of the item).

console.log('The item you are looking for is at index: ' + meerkatIndex);

// More Javascript
// 1. Create a function that takes 3 arguments and returns the sum of the these arguments.
function sumThreeNumbers(num1, num2, num3) {
  return num1 + num2 + num3;
}

// TODO: to remove console.log
console.log(sumThreeNumbers(4, 7, 10));

// 2. Create a function named colorCar that receives a color, and prints out, 'a red car' for example.
function colorCar(color) {
  return console.log(`a ${color} car`);
}

// TODO: to remove console.log
console.log(colorCar('blue'));

// 3. Create an object and a function that takes the object as a parameter and prints out all of its properties and values.
const user = {
  id: 1,
  name: 'admin',
  email: 'admin@email.com',
  admin: true,
};

function printObjectPropertiesAndValue(object) {
  for (key in object) {
    console.log(key, object[key]);
  }
}

// TODO: to remove console.log
printObjectPropertiesAndValue(user);

// 4. Create a function named vehicleType that receives a color, and a code, 1 for car, 2 for motorbike.
// And prints 'a blue motorbike' for example when called as vehicleType("blue", 2)

function vehicleType(color, code) {
  const VEHICLE_TYPES = ['car', 'motorbike'];

  if (code === 1) {
    return console.log(`a ${color} ${VEHICLE_TYPES[0]}`);
  } else if (code === 2) {
    return console.log(`a ${color} ${VEHICLE_TYPES[0]}`);
  } else {
    return console.log('vehicle type is not defined')
  }
}

// TODO: to remove console.log
vehicleType('yellow', 3);
vehicleType('blue', 1);
vehicleType('blue', 2);
vehicleType('blue', -3);

// 5. Can you write the following without the if statement, but with just as a single line with console.log(...);?1
// 6. Create a function called vehicle, like before, but takes another parameter called age, so that vehicle("blue", 1, 5) prints 'a blue used car'
// 7. Make a list of vehicles, you can add "motorbike", "caravan", "bike", or more.
// 8. How do you get the third element from that list?
// 9. Change the function vehicle to use the list of question 7. So that vehicle("green", 3, 1) prints "a green new bike".
// 10. Use the list of vehicles to write an advertisement. So that it prints something like: "Amazing Joe's Garage, we service cars, motorbikes, caravans and bikes.". (Hint: use a for loop.)
// Hint, the output should be correct English with all the punctuation in place (that's the challenge). So plurals for the vehicle types, commas followed by a single space, the word and to replace the final comma and closed off by a period.

// 11. What if you add one more vehicle to the list, can you have that added to the advertisement without changing the code for question 10?
// 12. Create an empty object.
// 13. Create an object that contains the teachers that you have had so far for the different modules.
// 14. Add a property to the object you just created that contains the languages that they have taught you.
// 15. Write some code to test two arrays for equality using == and ===. Test the following:
// let x = [1, 2, 3];
// let y = [1, 2, 3];
// let z = y;

// What do you think will happen with x == y, x === y and z == y and z == x? Prove it!
// Don't cheat! Seriously - try it first.
// Check out this Fiddle. You need to open your browser’s Developer Tools
// to see the console output. Press the Run button in the upper right corner to run the code.
// More insights from this Stack Overflow question.

// 16. Take a look at the following code:
// let o1 = { foo: "bar" };
// let o2 = { foo: "bar" };
// let o3 = o2;

// Show that changing o2 changes o3 (or not) and changing o1 changes o3(or not).
// Does the order that you assign (o3 = o2 or o2 = o3) matter?

// 17. What does the following code return? (And why?)
// let bar = 42;
// typeof typeof bar;

// ‘Coerce' means to try to change - so coercing var x = '6' to number means trying to change the type to number temporarily.
